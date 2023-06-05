const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const documentation = fs.readFileSync('./documentation.yml', 'utf8');
const swaggerDocument = YAML.parse(documentation);

router.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
