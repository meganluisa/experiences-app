import { tesselate } from "@turf/turf"
import getImages from "./routes"

test('responds to /images/', () => {
  const req = {}
  const res = { text: '',
      send: function(input) {this.text = input}}
  const img = [
    {
      name: 'name',
      id: 'jhfjfsh54-2cre-00094f', 
      photo: 
      {
        contentType:'image/png',
        data: 'i am data'
      },  
  }]
  getImages()

})