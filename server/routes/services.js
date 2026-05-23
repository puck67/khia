const express = require('express')
const pool = require('../db')

const router = express.Router()

// slug → booking label mapping
const SLUG_TO_LABEL = { 'chup-anh': 'Gói chụp', 'quay-video': 'Gói video' }
const LABEL_TO_SLUG = { 'Gói chụp': 'chup-anh', 'Gói video': 'quay-video' }

// GET /api/services/options
// Returns flat list of service names for booking dropdown
router.get('/options', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT slug FROM service_packages ORDER BY sort_order'
    )
    const options = result.rows.map((r) => SLUG_TO_LABEL[r.slug] || r.slug)
    res.json(options)
  } catch (err) {
    console.error('GET /api/services/options error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/services/categories?service=Gói+chụp
// Returns category names for a given service label
router.get('/categories', async (req, res) => {
  try {
    const { service } = req.query
    if (!service) return res.json([])

    const slug = LABEL_TO_SLUG[service]
    if (!slug) return res.json([])

    const result = await pool.query(
      `SELECT sc.name
       FROM service_categories sc
       JOIN service_packages sp ON sp.id = sc.package_id
       WHERE sp.slug = $1
       ORDER BY sc.sort_order`,
      [slug]
    )
    res.json(result.rows.map((r) => r.name))
  } catch (err) {
    console.error('GET /api/services/categories error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/services
// Returns all service packages with their categories and tags
router.get('/', async (req, res) => {
  try {
    const packagesResult = await pool.query(
      'SELECT id, slug, title, description, icon_type FROM service_packages ORDER BY sort_order'
    )

    const packages = packagesResult.rows

    if (packages.length === 0) {
      return res.json([])
    }

    const packageIds = packages.map((p) => p.id)

    const categoriesResult = await pool.query(
      `SELECT id, package_id, name, description
       FROM service_categories
       WHERE package_id = ANY($1)
       ORDER BY package_id, sort_order`,
      [packageIds]
    )

    const categoryIds = categoriesResult.rows.map((c) => c.id)

    const tagsResult = await pool.query(
      `SELECT category_id, tag
       FROM service_category_tags
       WHERE category_id = ANY($1)
       ORDER BY category_id, sort_order`,
      [categoryIds]
    )

    const tagsByCategory = {}
    for (const row of tagsResult.rows) {
      if (!tagsByCategory[row.category_id]) tagsByCategory[row.category_id] = []
      tagsByCategory[row.category_id].push(row.tag)
    }

    const categoriesByPackage = {}
    for (const cat of categoriesResult.rows) {
      if (!categoriesByPackage[cat.package_id]) categoriesByPackage[cat.package_id] = []
      categoriesByPackage[cat.package_id].push({
        name: cat.name,
        description: cat.description,
        tags: tagsByCategory[cat.id] || [],
      })
    }

    const result = packages.map((pkg) => ({
      slug: pkg.slug,
      title: pkg.title,
      description: pkg.description,
      iconType: pkg.icon_type,
      categories: categoriesByPackage[pkg.id] || [],
    }))

    res.json(result)
  } catch (err) {
    console.error('GET /api/services error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router

