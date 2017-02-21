var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleHeadbanger = require('role.headbanger');
var roleExterminator = require('role.exterminator');
const _ = require('lodash');

module.exports.loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    if (harvesters.length < 2) {
        var newName = Game.spawns['Erebor'].createCreep([WORK, WORK, MOVE, CARRY, MOVE], undefined, { role: 'harvester' });
        console.log('Spawning new harvester: ' + newName);
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    if (builders.length < 2) {
        var newName = Game.spawns['Erebor'].createCreep([WORK, WORK, CARRY, CARRY, MOVE], undefined, { role: 'builder' });
        console.log('Spawning new builder: ' + newName);
    } 

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    if (upgraders.length < 1) {
        var newName = Game.spawns['Erebor'].createCreep([WORK, WORK, MOVE, CARRY, MOVE], undefined, { role: 'upgrader' });
        console.log('Spawning new upgrader: ' + newName);
    }

    var headbangers = _.filter(Game.creeps, (creep) => creep.memory.role == 'headbanger');
    console.log('Headbangers: ' + upgraders.length);
    if (headbangers.length < 1) {
        var newName = Game.spawns['Erebor'].createCreep([WORK, WORK, WORK, MOVE], undefined, { role: 'headbanger' });
        console.log('Spawning new headbanger: ' + newName);
    }


    if (Game.spawns['Erebor'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Erebor'].spawning.name];
        Game.spawns['Erebor'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Erebor'].pos.x + 1,
            Game.spawns['Erebor'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    var tower = Game.getObjectById('TOWER_ID');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'headbanger') {
            roleHeadbanger.run(creep);
        }
        if (creep.memory.role == 'exterminator') {
            roleExterminator.run(creep);
        }
    }
};
