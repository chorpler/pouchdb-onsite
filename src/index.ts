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
import      PouchDB         from 'pouchdb'                     ;
import * as PDBReplication  from 'pouchdb-replication'         ;
import * as PDBAuth         from 'pouchdb-authentication'      ;
import * as pdbFind         from 'pouchdb-find'                ;
import * as pdbUpsert       from 'pouchdb-upsert'              ;
import * as PDBHttp         from 'pouchdb-adapter-http'        ;
import * as PDBIDB          from 'pouchdb-adapter-idb'         ;
import * as websqlPouch     from 'pouchdb-adapter-websql'      ;
import * as nodeWebsqlPouch from 'pouchdb-adapter-node-websql' ;
import * as pdbLevelDB      from 'pouchdb-adapter-leveldb'     ;
import * as pdbDebug        from 'pouchdb-debug'               ;

declare const window:any;

// const PDB1 = window && window.PouchDB ? window.PouchDB : PouchDB;

export const addPouchDBPlugin = (StaticPouchDB:any, plugin:any, description?:string) => {
  let text:string = description || "unknown";
  console.log(`addPouchDBPLugin(): Attempting to add plugin '${text}':`, plugin);
  if(StaticPouchDB && typeof StaticPouchDB.plugin === 'function') {
    if(plugin) {
      if(plugin.default != undefined) {
        StaticPouchDB.plugin(plugin.default);
      } else {
        StaticPouchDB.plugin(plugin);
      }
    } else {
      console.warn(`addPouchDBPlugin(): This plugin did not exist:`, plugin);
      return;
    }
  } else {
    console.warn(`addPouchDBPlugin(): The provided static PouchDB object was not correct:`, StaticPouchDB);
    return;
  }
};

class PouchDBOnSite {
  constructor() {
    this.initialize();
    return this;
  }
  public initialize() {
    if(typeof window !== 'undefined') {
      window['pouchdbonsite']      = this;
      window['PouchDBOnSiteClass'] = PouchDBOnSite;
    }
    addPouchDBPlugin(PouchDB , PDBReplication  , "pouchdb-replication");
    addPouchDBPlugin(PouchDB , PDBAuth         , "pouchdb-authentication");
    addPouchDBPlugin(PouchDB , pdbFind         , "pouchdb-find");
    addPouchDBPlugin(PouchDB , pdbUpsert       , "pouchdb-upsert");
    addPouchDBPlugin(PouchDB , pdbLevelDB      , "pouchdb-adapter-leveldb");
    addPouchDBPlugin(PouchDB , nodeWebsqlPouch , "pouchdb-adapter-node-websql");
    addPouchDBPlugin(PouchDB , websqlPouch     , "pouchdb-adapter-websql");
    addPouchDBPlugin(PouchDB , PDBHttp         , "pouchdb-adapter-http");
    addPouchDBPlugin(PouchDB , PDBIDB          , "pouchdb-adapter-idb");
    addPouchDBPlugin(PouchDB , pdbDebug        , "pouchdb-debug");
  }
}


export {PouchDBOnSite};