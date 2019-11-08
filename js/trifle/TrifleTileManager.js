// Tile Manager

var STANDARD = "Standard";
var TEMPLE = "Temple";
var RESTRICTED_BY_OPPONENT_TILE_ZONE = "Restricted by opponent tile zone";

var TrifleTiles = {};

var TileType = {
	banner: "banner",
	animal: "animal",
	flower: "flower",
	fruit: "fruit",
	other: "other"
};

var DeployType = {
	anywhere: "anywhere",
	temple: "temple"
};

var MovementType = {
	standard: "standard",
	diagonal: "diagonal"
};

var MovementRestriction = {
	restrictedByOpponentTileZones: "restrictedByOpponentTileZones",
	immobilizedByAdjacentOpponentTile: "immobilizedByAdjacentOpponentTile"
};

var MovementAbility = {
	carry: "carry",
	jumpOver: "jumpOver"
};

var CaptureType = {
	none: "none",
	all: "all"
};

function TrifleTileManager() {
	TrifleTileManager.defineTrifleTiles();
	this.hostTeam = [];
	this.guestTeam = [];
	this.hostTiles = [];
	this.guestTiles = [];
}

TrifleTileManager.defineTrifleTiles = function() {
	TrifleTiles = {};

	/**
	 TrifleTiles[TrifleTileCodes.TEMPLATE] = {
	 * 	types: [TileType.?]
	 * 	captureTypes: [ CaptureType.?, ... ],
	 * 	deployTypes: [ DeployType.?, ... ],
	 * 	movements: [
	 * 		{
	 * 			type: MovementType.?,
	 * 			distance: *number value*,
	 * 			restrictions: [
	 * 				{
	 * 					type: MovementRestriction.?,
	 * 					affectingTiles: [ TrifleTileCodes.?, ... ],
	 * 				}, {...}, ...
	 * 			],
	 * 			specialAbilities: [
	 * 				{
	 * 					type: MovementAbility.?,
	 * 					targetTileTypes: [ TileType.?, ...]
	 * 				}, {...}, ...
	 * 			]
	 * 		}, {...}, ...
	 * 	],
	 * 	territorialZoneSize: *number value*
	 }
	**/

	/* Vagabond Tiles */
	TrifleTiles[TrifleTileCodes.Lotus] = {
		types: [TileType.banner, TileType.flower],
		captureTypes: [ CaptureType.none ],
		deployTypes: [ DeployType.anywhere ],
		movements: [
			{
				type: MovementType.standard,
				distance: 1
			}
		]
	}

	TrifleTiles[TrifleTileCodes.SkyBison] = {
		types: [TileType.animal],
		captureTypes: [ CaptureType.all ],
		deployTypes: [ DeployType.temple ],
		movements: [
			{
				type: MovementType.standard,
				distance: 6,
				restrictions: [
					{
						type: MovementRestriction.restrictedByOpponentTileZones,
						affectingTiles: [ TrifleTileCodes.SkyBison ]
					},
					{
						type: MovementRestriction.immobilizedByAdjacentOpponentTile,
						affectingTiles: [ TrifleTileCodes.Chrysanthemum ]
					}
				]
			}
		],
		territorialZoneSize: 6
	};

	TrifleTiles[TrifleTileCodes.Wheel] = {
		types: [TileType.other],
		captureTypes: [ CaptureType.all ],
		deployTypes: [ DeployType.anywhere ],
		movements: [
			{
				type: MovementType.diagonal,
				distance: 99
			}
		]
	};


	/* Air Tiles */
	TrifleTiles[TrifleTileCodes.AirBanner] = {
		types: [TileType.banner],
		captureTypes: [ CaptureType.none ],
		deployTypes: [ DeployType.anywhere ],
		movements: [
			{
				type: MovementType.standard,
				distance: 1
			}
		]
	};

	TrifleTiles[TrifleTileCodes.FlyingLemur] = {
		types: [TileType.animal],
		captureTypes: [ CaptureType.none ],
		deployTypes: [ DeployType.anywhere ],
		movements: [
			{
				type: MovementType.standard,
				distance: 3,
				specialAbilities: [
					{
						type: MovementAbility.carry,
						targetTileTypes: [ TileType.flower ]
					}
				]
			}
		]
	};

	TrifleTiles[TrifleTileCodes.RingTailedLemur] = {
		types: [TileType.animal],
		captureTypes: [ CaptureType.all ],
		deployTypes: [ DeployType.temple ],
		movements: [
			{
				type: MovementType.standard,
				distance: 5,
				specialAbilities: [
					{
						type: MovementAbility.jumpOver
					}
				]
			}
		]
	};


};

// TrifleTileManager.prototype.loadTileSet = function(ownerCode) {
// 	var tiles = [];

// 	this.addTiles(tiles, ownerCode);

// 	if (gameOptionEnabled(OPTION_DOUBLE_TILES)) {
// 		this.addTiles(tiles, ownerCode);
// 	}

// 	// Only ever 1 Lotus tile
// 	tiles.push(new TrifleTile('L', ownerCode));

// 	return tiles;
// };

// TrifleTileManager.prototype.addTiles = function(tiles, ownerCode) {
// 	// 2 of each of these tiles
// 	var twoOfTheseTiles = [
// 		TrifleTileCodes.SkyBison,
// 		TrifleTileCodes.Badgermole,
// 		TrifleTileCodes.Wheel,
// 		TrifleTileCodes.Chrysanthemum
// 	];
// 	for (var i = 0; i < twoOfTheseTiles.length; i++) {
// 		tiles.push(new TrifleTile(twoOfTheseTiles[i], ownerCode));
// 		tiles.push(new TrifleTile(twoOfTheseTiles[i], ownerCode));
// 	}

// 	// 1 of each of these tiles
// 	tiles.push(new TrifleTile(TrifleTileCodes.FireLily, ownerCode));
// 	tiles.push(new TrifleTile(TrifleTileCodes.Dragon, ownerCode));

// 	tiles.push(new TrifleTile(TrifleTileCodes.MessengerHawk, ownerCode));
// };

TrifleTileManager.prototype.grabTile = function(player, tileCode) {
	var tilePile = this.hostTiles;
	if (player === GUEST) {
		tilePile = this.guestTiles;
	}

	var tile;
	for (var i = 0; i < tilePile.length; i++) {
		if (tilePile[i].code === tileCode) {
			newTileArr = tilePile.splice(i, 1);
			tile = newTileArr[0];
			break;
		}
	}

	if (!tile) {
		debug("NONE OF THAT TILE FOUND");
	}

	return tile;
};

TrifleTileManager.prototype.peekTile = function(player, tileCode, tileId) {
	var tilePile = this.hostTiles;
	if (player === GUEST) {
		tilePile = this.guestTiles;
	}

	var tile;
	if (tileId) {
		for (var i = 0; i < tilePile.length; i++) {
			if (tilePile[i].id === tileId) {
				return tilePile[i];
			}
		}
	}

	for (var i = 0; i < tilePile.length; i++) {
		if (tilePile[i].code === tileCode) {
			tile = tilePile[i];
			break;
		}
	}

	if (!tile) {
		debug("NONE OF THAT TILE FOUND");
	}

	return tile;
};

TrifleTileManager.prototype.removeSelectedTileFlags = function() {
	this.hostTiles.forEach(function(tile) {
		tile.selectedFromPile = false;
	});
	this.guestTiles.forEach(function(tile) {
		tile.selectedFromPile = false;
	});
};

TrifleTileManager.prototype.unselectTiles = function(player) {
	var tilePile = this.getPlayerTilePile(player);

	tilePile.forEach(function(tile) {
		tile.selectedFromPile = false;
	});
}

TrifleTileManager.prototype.putTileBack = function(tile) {
	var player = tile.ownerName;
	var tilePile = this.getPlayerTilePile(player);

	tilePile.push(tile);
};

TrifleTileManager.prototype.getTeamSize = function() {
	return 11;
};

TrifleTileManager.prototype.hostTeamIsFull = function() {
	return this.playerTeamIsFull(HOST);
};

TrifleTileManager.prototype.guestTeamIsFull = function() {
	return this.playerTeamIsFull(GUEST);
};

TrifleTileManager.prototype.playerTeamIsFull = function(player) {
	return this.getPlayerTeam(player).length >= this.getTeamSize();
};

TrifleTileManager.prototype.playerTeamHasBanner = function(player) {
	var team = this.getPlayerTeam(player);
	for (var i = 0; i < team.length; i++) {
		var tileInfo = TrifleTiles[team[i].code];
		if (tileInfo && this.tileInfoIsBanner(tileInfo)) {
			return true;
		}
	}
	return false;
};

TrifleTileManager.prototype.tileInfoIsBanner = function(tileInfo) {
	return tileInfo && tileInfo.types.includes(TileType.banner);
};

TrifleTileManager.prototype.addToTeamIfOk = function(tile) {
	var addOk = false;
	var player = tile.ownerName;
	if (!this.playerTeamIsFull(player)) {
		/* Team isn't full, that's the first check! */
		addOk = true;	// So far!

		var tileInfo = TrifleTiles[tile.code];
		/* If tile is Banner, it's ok if we don't have one */
		if (this.tileInfoIsBanner(tileInfo)) {
			addOk = addOk && !this.playerTeamHasBanner(player);
		} else {
			/* If tile is not banner, we just need to make sure we have room on the team for one or have one already */
			addOk = addOk && (this.playerTeamHasBanner(player)
					|| this.getPlayerTeam(player).length < this.getTeamSize() - 1);
		}

		var howManyAlreadyInTeam = this.countOfThisTileInTeam(tile.code, tile.ownerName);
		addOk = addOk && howManyAlreadyInTeam < TrifleTile.getTeamLimitForTile(tile.code);

		if (addOk) {
			this.getPlayerTeam(tile.ownerName).push(tile);
			this.getPlayerTilePile(tile.ownerName).push(tile);
		}
	}

	return addOk;
};

TrifleTileManager.prototype.countOfThisTileInTeam = function(tileCode, ownerName) {
	var count = 0;
	var ownerTeam = this.getPlayerTeam(ownerName);

	for (var i = 0; i < ownerTeam.length; i++) {
		if (ownerTeam[i].code === tileCode) {
			count++;
		}
	}
	return count;
};

TrifleTileManager.prototype.getPlayerTeam = function(player) {
	var playerTeam = this.hostTeam;
	if (player === GUEST) {
		playerTeam = this.guestTeam;
	}
	return playerTeam;
};

TrifleTileManager.prototype.getPlayerTilePile = function(player) {
	var tilePile = this.hostTiles;
	if (player === GUEST) {
		tilePile = this.guestTiles;
	}
	return tilePile;
};

TrifleTileManager.prototype.getCopy = function() {
	var copy = new TrifleTileManager();

	// copy this.hostTiles and this.guestTiles
	
	return copy;
};
