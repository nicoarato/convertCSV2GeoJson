let csvToJson = require('convert-csv-to-json');

let fileInputName = 'pac_202105.csv'; 
let fileOutputName = 'archivo.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);

let fileCsv = csvToJson.getJsonFromCsv("pac_202105.csv");
let archivoJson = '{"type": "FeatureCollection","features":';

for(let i=0; i<fileCsv.length;i++){
    let objJson = fileCsv[i];
    let latitud = objJson.latitud.replace(",",".");
    let longitud = objJson.longitud.replace(",",".");
    let json = `{
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
          ${longitud},${latitud}
        ]
      }
    }`;
    archivoJson += (i===0) ? `[${json}`: `, ${json}`;
    if( longitud === '' || latitud === '') 
    {
      console.log(`Agencia sin coordenadas: ${objJson.red}/${objJson.subagente}`);
    }
  }
  
archivoJson += ']}';

const fs = require('fs')

fs.writeFile('./geojson2021-05.json', archivoJson, err => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file :)');
    }
})
