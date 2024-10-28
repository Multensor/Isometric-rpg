import * as THREE from 'three'

export class World extends THREE.Mesh {
  constructor(width, height) {
    super()

    this.width = width
    this.height = height
    this.treeCount = 10
    this.rockCount = 20
    this.bushCount = 10

    this.createTerrain()
    this.createTrees()
    this.createRocks()
    this.createBushes()
  }

  createTerrain() {
    if (this.terrain) {
      this.terrain.geometry.dispose()
      this.terrain.material.dispose()
      this.remove(this.terrain)
    }
    const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0x50a000 })
    const terrainGeometry = new THREE.PlaneGeometry(this.width, this.height, this.width, this.height)

    this.terrain = new THREE.Mesh(terrainGeometry, terrainMaterial)
    this.terrain.rotation.x = -Math.PI / 2
    this.terrain.position.set(this.width / 2, 0, this.height / 2)
    this.add(this.terrain)
  }

  createTrees() {
    const treeRadius = 0.2
    const treeHeight = 1

    const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8)
    const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x305010, flatShading: true })

    this.trees = new THREE.Group()
    this.add(this.trees)

    for (let i = 0; i < this.treeCount; i++) {
      const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial)
      treeMesh.position.set(
        Math.floor(this.width * Math.random()) + 0.5,
        treeHeight / 2,
        Math.floor(this.height * Math.random()) + 0.5
      )
      this.trees.add(treeMesh)
    }
  }

  createRocks() {
    const minRockRadius = 0.1
    const maxRockRadius = 0.3
    const minRockHeight = 0.5
    const maxRockHeight = 0.8
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0xb0b0b0, flatShading: true })

    this.bushes = new THREE.Group()
    this.add(this.bushes)

    for (let i = 0; i < this.rockCount; i++) {
      const radius = minRockRadius + Math.random() * (maxRockRadius - minRockRadius)
      const height = minRockHeight + Math.random() * (maxRockHeight - minRockHeight)
      const rockGeometry = new THREE.SphereGeometry(radius, 6, 5)
      const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial)
      rockMesh.position.set(
        Math.floor(this.width * Math.random()) + 0.5,
        0,
        Math.floor(this.height * Math.random()) + 0.5
      )
      rockMesh.scale.y = height
      this.bushes.add(rockMesh)
    }
  }

  createBushes() {
    const minBushRadius = 0.1
    const maxBushRadius = 0.3

    const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x80a040, flatShading: true })

    this.bushes = new THREE.Group()
    this.add(this.bushes)

    for (let i = 0; i < this.bushCount; i++) {
      const radius = minBushRadius + Math.random() * (maxBushRadius - minBushRadius)
      const height = minBushRadius + Math.random() * (maxBushRadius - minBushRadius)
      const bushGeometry = new THREE.SphereGeometry(radius, 8, 8)
      const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial)
      bushMesh.position.set(
        Math.floor(this.width * Math.random()) + 0.5,
        radius,
        Math.floor(this.height * Math.random()) + 0.5
      )
      this.bushes.add(bushMesh)
    }
  }
}
