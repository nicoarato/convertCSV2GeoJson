// let red = '6001';
// let subagente ='0';
// let permiso = '6001';
// let titular = 'AGENCIA MINES S.R.L.';
// let promedio_ventas_3mes = '1201510';
// let estado_comercial = "nuevo";
// let lat = '-60.7089439';
// let lon = '-31.647591';


// let json1 =JSON.parse( `{
//       "type": "Feature",
//       "properties": {
//         "red": ${red},
//         "subagente": ${subagente},
//         "permiso":${permiso},
//         "titular": "${titular}",
//         "promedio_ventas_3mes": ${promedio_ventas_3mes},
//         "estado_comercial": "${estado_comercial}"
//       },
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           ${lat},${lon}
//         ]
//       }
//     }`);
//     // console.log(json);
    

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
    // console.log(typeof archivoJson);
  }
  
archivoJson += ']}';

const fs = require('fs')
const jsonString = archivoJson;
console.log(jsonString);

fs.writeFile('./geojson2021-05.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
})
