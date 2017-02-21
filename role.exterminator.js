var roleExterminator = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var enemyConSite = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
        if (creep.attack(enemyConSite) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemyConSite, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
};

module.exports = roleExterminator;
