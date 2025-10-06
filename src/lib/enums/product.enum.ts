// Mahsulot o'lchamlari
export enum ProductSize {
    SMALL = "SMALL",
    NORMAL = "NORMAL",
    LARGE = "LARGE",
    SET = "SET"
  }
  
  // Mahsulot hajmlari
  export enum ProductVolume {
    HALF = 0.5,
    ONE = 1,
    ONE_POINT_TWO = 1.2,
    ONE_POINT_FIVE = 1.5,
    TWO = 2,
  }
  
  // Mahsulot holatlari
  export enum ProductStatus {
    PAUSE = "PAUSE",
    PROCESS = "PROCESS",
    DELETE = "DELETE"
  }
  
  // Mahsulot toifalari
  export enum ProductCollection {
    DISH = "DISH",
    SALAD = "SALAD",
    DESSERT = "DESERT",  // ❗️Eslatma: aslida bu "DESSERT" emas, noto'g'ri yozilgan "DESERT" -> to'g'risi DESSERT
    DRINK = "DRINK",
    OTHER = "OTHER"
  }