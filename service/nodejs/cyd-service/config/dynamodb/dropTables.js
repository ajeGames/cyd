const admin = require('../../api/persistence/admin-db');

admin.dropTables(["Stories", "Chapters"]);
