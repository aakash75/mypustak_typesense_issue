export const capitalize = (worlds) => {
    let worldlist = worlds.split(" ")

    let capWorldList = worldlist.map((world) => {
        let lowerWorld = world.toLowerCase()
        return lowerWorld.charAt(0).toUpperCase() + lowerWorld.slice(1)
    })

    let result = ""
    capWorldList.map((world) => {
        result = result + " " + world
    })
    return result
}