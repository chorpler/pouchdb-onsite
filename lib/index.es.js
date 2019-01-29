import PouchDB from 'pouchdb';
import * as PDBReplication from 'pouchdb-replication';
import * as PDBAuth from 'pouchdb-authentication';
import * as pdbFind from 'pouchdb-find';
import * as pdbUpsert from 'pouchdb-upsert';
import * as PDBHttp from 'pouchdb-adapter-http';
import * as PDBIDB from 'pouchdb-adapter-idb';
import * as websqlPouch from 'pouchdb-adapter-websql';
import * as nodeWebsqlPouch from 'pouchdb-adapter-node-websql';
import * as pdbLevelDB from 'pouchdb-adapter-leveldb';
import * as pdbDebug from 'pouchdb-debug';

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

export { addPouchDBPlugin, PouchDBOnSite };
//# sourceMappingURL=index.es.js.map
