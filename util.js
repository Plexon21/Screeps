var util = {

    /** @param {Creep} creep **/
    getEnergy: function (creep) {
        var drops = creep.room.find(FIND_DROPPED_ENERGY, {
            filter: (drop) => drop.energy > 10
        });
        if (drops.length) {
            if (creep.pickup(drops[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(drops[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        } else {
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (container) => container.structureType == STRUCTURE_CONTAINER &&
                    container.store[RESOURCE_ENERGY] > 10
            });
            if (containers.length) {
                if (creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
    }
};
module.exports = util;