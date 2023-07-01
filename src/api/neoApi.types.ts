export interface NeoData {
  element_count: number,
  links: {
    next: string,
    prev: string,
    self: string,
  }
  near_earth_objects: {
    [key: string]: NeoObjectData[],
  }
}

export interface NeoObjectData {
  id: string,
  name: string,
  nasa_jpl_url: string,
  is_potentially_hazardous_asteroid: boolean,
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number,
      estimated_diameter_max: number,
    }
  }
  close_approach_data: [{
    close_approach_date_full: string,
    miss_distance: {
      kilometers: number,
    }
    relative_velocity: {
      kilometers_per_second: number,
    }
  }]
}