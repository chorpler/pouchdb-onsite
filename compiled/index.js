"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// "pouchdb"
// "pouchdb-abstract-mapreduce"
// "pouchdb-adapter-http"
// "pouchdb-adapter-idb"
// "pouchdb-adapter-leveldb"
// "pouchdb-adapter-leveldb-core"
// "pouchdb-adapter-memory"
// "pouchdb-adapter-node-websql"
// "pouchdb-adapter-utils"
// "pouchdb-adapter-websql"
// "pouchdb-adapter-websql-core"
// "pouchdb-authentication"
// "pouchdb-binary-utils"
// "pouchdb-changes-filter"
// "pouchdb-checkpointer"
// "pouchdb-collate"
// "pouchdb-collections"
// "pouchdb-core"
// "pouchdb-debug"
// "pouchdb-errors"
// "pouchdb-fetch"
// "pouchdb-find"
// "pouchdb-generate-replication-id"
// "pouchdb-json"
// "pouchdb-mapreduce"
// "pouchdb-mapreduce-utils"
// "pouchdb-md5"
// "pouchdb-merge"
// "pouchdb-node"
// "pouchdb-replication"
// "pouchdb-selector-core"
// "pouchdb-upsert"
// "pouchdb-utils"
var pouchdb_1 = __importDefault(require("pouchdb"));
var PDBReplication = __importStar(require("pouchdb-replication"));
var PDBAuth = __importStar(require("pouchdb-authentication"));
var pdbFind = __importStar(require("pouchdb-find"));
var pdbUpsert = __importStar(require("pouchdb-upsert"));
var PDBHttp = __importStar(require("pouchdb-adapter-http"));
var PDBIDB = __importStar(require("pouchdb-adapter-idb"));
var websqlPouch = __importStar(require("pouchdb-adapter-websql"));
var nodeWebsqlPouch = __importStar(require("pouchdb-adapter-node-websql"));
var pdbLevelDB = __importStar(require("pouchdb-adapter-leveldb"));
var pdbDebug = __importStar(require("pouchdb-debug"));
// const PDB1 = window && window.PouchDB ? window.PouchDB : PouchDB;
exports.addPouchDBPlugin = function (StaticPouchDB, plugin, description) {
    var text = description || "unknown";
    console.log("addPouchDBPLugin(): Attempting to add plugin '" + text + "':", plugin);
    if (StaticPouchDB && typeof StaticPouchDB.plugin === 'function') {
        if (plugin) {
            if (plugin.default != undefined) {
                StaticPouchDB.plugin(plugin.default);
            }
            else {
                StaticPouchDB.plugin(plugin);
            }
        }
        else {
            console.warn("addPouchDBPlugin(): This plugin did not exist:", plugin);
            return;
        }
    }
    else {
        console.warn("addPouchDBPlugin(): The provided static PouchDB object was not correct:", StaticPouchDB);
        return;
    }
};
var PouchDBOnSite = /** @class */ (function () {
    function PouchDBOnSite() {
        this.initialize();
        return this;
    }
    PouchDBOnSite.prototype.initialize = function () {
        if (typeof window !== 'undefined') {
            window['pouchdbonsite'] = this;
            window['PouchDBOnSiteClass'] = PouchDBOnSite;
        }
        exports.addPouchDBPlugin(pouchdb_1.default, PDBReplication, "pouchdb-replication");
        exports.addPouchDBPlugin(pouchdb_1.default, PDBAuth, "pouchdb-authentication");
        exports.addPouchDBPlugin(pouchdb_1.default, pdbFind, "pouchdb-find");
        exports.addPouchDBPlugin(pouchdb_1.default, pdbUpsert, "pouchdb-upsert");
        exports.addPouchDBPlugin(pouchdb_1.default, pdbLevelDB, "pouchdb-adapter-leveldb");
        exports.addPouchDBPlugin(pouchdb_1.default, nodeWebsqlPouch, "pouchdb-adapter-node-websql");
        exports.addPouchDBPlugin(pouchdb_1.default, websqlPouch, "pouchdb-adapter-websql");
        exports.addPouchDBPlugin(pouchdb_1.default, PDBHttp, "pouchdb-adapter-http");
        exports.addPouchDBPlugin(pouchdb_1.default, PDBIDB, "pouchdb-adapter-idb");
        exports.addPouchDBPlugin(pouchdb_1.default, pdbDebug, "pouchdb-debug");
    };
    return PouchDBOnSite;
}());
exports.PouchDBOnSite = PouchDBOnSite;
//# sourceMappingURL=index.js.map