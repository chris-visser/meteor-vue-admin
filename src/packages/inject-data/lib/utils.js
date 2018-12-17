import { EJSON } from 'meteor/ejson'
import { InjectData } from './namespace'

/**
 * Returns an encoded string that represents an object.
 * @param {object} ejson
 */
InjectData.encode = InjectData._encode = function(ejson) {
	const ejsonString = EJSON.stringify(ejson)
	return encodeURIComponent(ejsonString)
}

/**
 * Decodes an encoded string into an object.
 * @param {string} encodedEjson
 */
InjectData.decode = InjectData._decode = function(encodedEjson) {
	const decodedEjsonString = decodeURIComponent(encodedEjson)
	if (!decodedEjsonString) return null

	return EJSON.parse(decodedEjsonString)
}
