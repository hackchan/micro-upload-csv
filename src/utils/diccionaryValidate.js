import {
  findSeparadorPunto,
  findSeparadorComa,
  validIsNumber,
  findNoExistComas,
  validFormatDate,
  validStringNoEmpty,
  validStringNA,
  isValidData
} from './util-diccionary'

class DiccionaryValidate {
  constructor(dataJson, selDiccionary) {
    this.dictionary = require('./dictionary.json')
    this.selDiccionary = this.dictionary[selDiccionary]
    this.dataJson = dataJson
    this.firtDataJson = dataJson[0]
  }

  async getValidTotalColumnas() {
    try {
      const namesHeader = Object.keys(this.firtDataJson)
      const columnsValids = Object.keys(this.selDiccionary)
      const totalColumsFile = namesHeader.length
      const totalColumsDicc = columnsValids.length
      if (totalColumsFile !== totalColumsDicc) {
        throw new Error(
          `la cantidad de columnas del archivo es de ${totalColumsFile} y no coincide con el total del diccionario de datos que son ${totalColumsDicc}, si tiene la misma cantidad de columnas valide abriendo el archivo en excel y que no tenga una fila corrida.`
        )
      }
      namesHeader.map((column, index) => {
        if (column.toLowerCase() !== columnsValids[index].toLowerCase()) {
          throw new Error(
            `el nombre del encabezado del archivo ${column.toLowerCase()} es diferente al solicitado ${columnsValids[
              index
            ].toLowerCase()}`
          )
        }
        return column
      })
    } catch (error) {
      throw error
    }
  }

  async getValidNamesColumns() {
    try {
      const totalColumHeader = Object.keys(this.firtDataJson).length
      const totalColumnDic = Object.keys(this.selDiccionary).length
      const columnsValids = Object.keys(this.selDiccionary)
      if (Number(totalColumHeader) > Number(totalColumnDic)) {
        throw new Error(
          `El archivo enviado tiene mas columnas de las solicitadas en el diccionario de datos, solo de tener las siguientes columnas: ${columnsValids.join()}.`
        )
      } else if (totalColumHeader < totalColumnDic) {
        throw new Error(
          `El archivo enviado tiene menos columnas de las solicitadas en el diccionario de datos, solo de tener las siguientes columnas: ${columnsValids.join()}`
        )
      }
    } catch (error) {
      throw error
    }
  }

  async getValidDatatype() {
    try {
      const dictionary = this.selDiccionary
      let numeroFila = 2

      for (let fila of this.dataJson) {
        const filaKeys = Object.keys(fila)
        for (let columna of filaKeys) {
          const campo = fila[columna]
          const regla = dictionary[columna]
          await isValidData(numeroFila, columna, campo, regla)
          if (regla.tipo === 'Number' && regla.coma) {
            await findSeparadorPunto(numeroFila, columna, campo, regla)
            await findSeparadorComa(numeroFila, columna, campo, regla)
          } else if (regla.tipo === 'Number' && !regla.coma) {
            await validIsNumber(numeroFila, columna, campo)
            await findNoExistComas(numeroFila, columna, campo, regla)
            await findSeparadorPunto(numeroFila, columna, campo, regla)
          } else if (regla.tipo === 'Date') {
            await validFormatDate(numeroFila, columna, campo, regla)
          } else if (regla.tipo === 'String') {
            await validStringNoEmpty(numeroFila, columna, campo, regla)
            await validStringNA(numeroFila, columna, campo, regla)
          }
        }
        numeroFila++
      }
    } catch (error) {
      throw error
    }
  }
}
export default DiccionaryValidate
