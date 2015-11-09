import constants from '../internals/constants';
import parseAshNodeId from '../DOM/parseAshNodeId';
import isMatching from '../internals/isMatching';
import topics from './events';


const INDEX_SEPARATOR = constants.INDEX_SEPARATOR;

export default function reindexEvents(oldId, oldIndices, newIndex, streamId) {
	var splitOldId = oldId.split(INDEX_SEPARATOR);

	for (let topicName in topics) {
		if (topics.hasOwnProperty(topicName)) {
			for (let i = 0; i < topics[topicName].length; i++) {
				if (streamId === topics[topicName][i].streamId && isMatching(splitOldId, topics[topicName][i].id.split(INDEX_SEPARATOR), true) && !topics[topicName][i].isNewlyInserted && !topics[topicName][i].isReindexed[oldIndices.length - 1]) {
					let indices = parseAshNodeId(topics[topicName][i].id);

					indices[oldIndices.length - 1] = newIndex;
					topics[topicName][i].id = indices.join(INDEX_SEPARATOR);
					topics[topicName][i].isReindexed[oldIndices.length - 1] = true;
				}
			}
		}
	}
}
