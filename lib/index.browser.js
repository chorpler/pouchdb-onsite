'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var PouchDB = _interopDefault(require('pouchdb'));
var PDBReplication = require('pouchdb-replication');
var PDBAuth = require('pouchdb-authentication');
var pdbFind = require('pouchdb-find');
var pdbUpsert = require('pouchdb-upsert');
var PDBHttp = require('pouchdb-adapter-http');
var PDBIDB = require('pouchdb-adapter-idb');
var websqlPouch = require('pouchdb-adapter-websql');
var nodeWebsqlPouch = require('pouchdb-adapter-node-websql');
var pdbLevelDB = require('pouchdb-adapter-leveldb');
var pdbDebug = require('pouchdb-debug');

// "pouchdb"
// const PDB1 = window && window.PouchDB ? window.PouchDB : PouchDB;
var addPouchDBPlugin = function (StaticPouchDB, plugin, description) {
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
        addPouchDBPlugin(PouchDB, PDBReplication, "pouchdb-replication");
        addPouchDBPlugin(PouchDB, PDBAuth, "pouchdb-authentication");
        addPouchDBPlugin(PouchDB, pdbFind, "pouchdb-find");
        addPouchDBPlugin(PouchDB, pdbUpsert, "pouchdb-upsert");
        addPouchDBPlugin(PouchDB, pdbLevelDB, "pouchdb-adapter-leveldb");
        addPouchDBPlugin(PouchDB, nodeWebsqlPouch, "pouchdb-adapter-node-websql");
        addPouchDBPlugin(PouchDB, websqlPouch, "pouchdb-adapter-websql");
        addPouchDBPlugin(PouchDB, PDBHttp, "pouchdb-adapter-http");
        addPouchDBPlugin(PouchDB, PDBIDB, "pouchdb-adapter-idb");
        addPouchDBPlugin(PouchDB, pdbDebug, "pouchdb-debug");
    };
    return PouchDBOnSite;
}());

exports.addPouchDBPlugin = addPouchDBPlugin;
exports.PouchDBOnSite = PouchDBOnSite;
//# sourceMappingURL=index.browser.js.map
