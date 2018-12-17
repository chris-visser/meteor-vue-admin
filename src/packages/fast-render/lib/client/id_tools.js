/* global Package */
import { Minimongo } from 'meteor/minimongo'
export const IDTools = {}
IDTools.idParse = Minimongo.LocalCollection._idParse
IDTools.idStringify = Minimongo.LocalCollection._idStringify
IDTools.ObjectID = Minimongo.LocalCollection._ObjectID

// To support Meteor 1.2
if (Package['mongo-id']) {
	var MongoID = Package['mongo-id'].MongoID
	IDTools.idParse = MongoID.idParse
	IDTools.idStringify = MongoID.idStringify
	IDTools.ObjectID = MongoID.ObjectID
}
