let csvToJson = require('convert-csv-to-json');

let fileInputName = 'pac_202105.csv'; 
let fileOutputName = 'archivo.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);

let json2 = csvToJson.getJsonFromCsv("pac_202105.csv");
let json = '';
let archivoJson = '{"type": "FeatureCollection","features":';

for(let i=0; i<json2.length;i++){
    let objJson = json2[i];
    let lat = objJson.latitud.replace(",",".");
    let lon = objJson.longitud.replace(",",".");
    json = `{
      "type": "Feature",
      "properties": {
        "red": ${objJson.red},
        "subagente": ${objJson.subagente},
        "permiso":${objJson.permiso},
        "titular": "${objJson.titular.trim()}",
        "promedio_ventas_3mes": ${objJson.promedio_ventas_3mes},
        "estado_comercial": "${objJson.estado_comercial}"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          ${lon},${lat}
        ]
      }
    }`;
    archivoJson += (i===0) ? `[${json}`: `, ${json}`;
    if( lon === '' || lat === '') 
    {
      console.log(`Agencia sin recaudación: ${objJson.red}/${objJson.subagente}`);
    }
  }
  
archivoJson += ']}';

const fs = require('fs')
const jsonString = archivoJson;
// console.log(jsonString);

fs.writeFile('./geojson2021-05.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file :)');
    }
})
