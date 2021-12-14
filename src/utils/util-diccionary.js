import moment from 'moment'

export const findColumsExtra = (columsFile, columsDictionary) => {
  try {
    let difference
    if (columsFile.length > columsDictionary.length) {
      difference = columsFile.filter(
        (column) => !columsDictionary.includes(column.toLowerCase())
      )
    } else {
      difference = columsDictionary.filter((column) => !columsFile.includes(column))
    }
    return difference
  } catch (error) {
    throw error
  }
}

export const findDuplicateObject = (reportData) => {
  try {
    let fila1
    let fila2
    let filtrados = reportData.filter(
      (reportDataItem, reportDataIndice, reportDataArray) => {
        let indice = reportDataArray.findIndex((reportDataArrayItem) => {
          return JSON.stringify(reportDataArrayItem) === JSON.stringify(reportDataItem)
        })
        let isIndx = indice !== reportDataIndice
        if (isIndx) {
          fila1 = indice
          fila2 = reportDataIndice
        }
        return isIndx
      }
    )

    if (filtrados.length > 0) {
      throw new Error(
        `la fila=> ${fila1 + 2} con la fila=> ${
          fila2 + 2
        } error=> se esta repitiendo la siguiente informacion ${JSON.stringify(
          filtrados
        )} `
      )
    }
  } catch (error) {
    throw error
  }
}

export const removeObjDuplic = (report) => {
  try {
    let findIndex = 0
    let filtrados = report.filter((actual, indice, arreglo) => {
      if (
        arreglo.findIndex((valorArreglo) => {
          return JSON.stringify(valorArreglo) === JSON.stringify(actual)
        }) !== indice
      ) {
        findIndex = indice
      }
      return (
        arreglo.findIndex((valorArreglo) => {
          return JSON.stringify(valorArreglo) === JSON.stringify(actual)
        }) !== indice
      )
    })

    if (filtrados.length > 0) {
      throw new Error(
        `fila=> ${findIndex} error=> se esta repitiendo la siguiente informacion ${JSON.stringify(
          filtrados
        )} `
      )
    }
  } catch (error) {
    throw error
  }
}

export const cleanJSON = (fila) => {
  try {
    let result = Object.keys(fila).reduce(
      (prev, current) => ({
        ...prev,
        [current.toLowerCase()]: fila[current]
      }),
      {}
    )
    return result
  } catch (error) {
    throw error
  }
}

export const findNoExistComas = (numeroFila, nombreColuma, campo, regla) => {
  try {
    const tot = campo.split(',').length
    if (tot > 1) {
      throw new Error(
        `columna => ${nombreColuma}
           fila    => ${numeroFila}
           valor   => ${campo}
           error   => ${regla.message} `
      )
    }
  } catch (error) {
    throw error
  }
}

export const validFormatDate = (numeroFila, nombreColuma, campo, regla) => {
  try {
    if (!moment(campo, moment.HTML5_FMT.DATE, true).isValid()) {
      throw new Error(
        `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${
          campo ? campo : 'vacio'
        } error=> ${regla.message} `
      )
    }
  } catch (error) {
    throw error
  }
}

export const validStringNoEmpty = (numeroFila, nombreColuma, campo) => {
  try {
    if (!campo || campo.length === 0) {
      throw new Error(
        `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${
          campo ? campo : 'vacio'
        } error=> No puede haber campos de texto vacios, recuerde el valor por defecto N/A`
      )
    }
  } catch (error) {
    throw error
  }
}

export const validStringNA = (numeroFila, nombreColuma, campo) => {
  try {
    if (
      !campo ||
      campo === 'na' ||
      campo === 'n/a' ||
      campo === 'n/A' ||
      campo === 'n A' ||
      campo === 'N/a'
    ) {
      throw new Error(
        `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${
          campo ? campo : 'vacio'
        } error=> solo es valido el valor por defecto para texto => N/A`
      )
    }
  } catch (error) {
    throw error
  }
}

export const validIsNumber = (numeroFila, nombreColuma, campo) => {
  try {
    if (!/^[0-9]+$/.test(campo)) {
      throw new Error(
        `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${
          campo ? campo : 'vacio'
        } error=> Debe ser un valor numerico `
      )
    }
  } catch (error) {
    throw error
  }
}

export const isValidData = (numeroFila, nombreColuma, campo, regla) => {
  try {
    if (regla.valid != 0 && Array.isArray(regla.valid)) {
      if (!regla.valid.includes(campo)) {
        throw new Error(
          `columna => ${nombreColuma ? nombreColuma : 'vacio'} fila=> ${
            numeroFila ? numeroFila : 'vacio'
          } valor=> ${
            campo ? campo : 'vacio'
          } error=> debe contener uno de los siguientes valores ${regla.valid}`
        )
      }
    }
  } catch (error) {
    throw error
  }
}

export const findSeparadorComa = (numeroFila, nombreColuma, campo, regla) => {
  try {
    const tot = campo.split(',').length
    if (tot > 2) {
      throw new Error(
        `columna => ${nombreColuma} fila=> ${numeroFila} valor=> ${campo} error=> ${regla.message} `
      )
    }
    //return Number(campo.replace(/,/g, '.'))
  } catch (error) {
    throw error
  }
}

export const findSeparadorPunto = (numeroFila, nombreColuma, campo, regla) => {
  try {
    const tot = campo.split('.').length
    if (tot > 1) {
      throw new Error(
        `[ columna =>  ${nombreColuma} ]
           [ fila    =>  ${numeroFila}   ]
           [ valor   =>  ${campo}        ]
           [ error   =>  ${regla.message}] `
      )
    }
  } catch (error) {
    throw error
  }
}
