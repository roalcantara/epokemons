export class Pokemon {
  public static RESOURCE = 'pokemons'

  id: number
  name: string
  height: number
  weight: number
  created_at: Date

  constructor(args?: Partial<Pokemon>) {
    const { id, name, height, weight, created_at } = args ?? {}

    Object.assign(this, { id, name, height, weight, created_at })
  }
}
