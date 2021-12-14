import { success } from '../../../network/response'
import ServiceFile from '../../../utils/servicesFiles'
import ServicesCsv from '../../../utils/cvs'
import ServicesDiccionaryValidate from '../../../utils/diccionaryValidate'

const fs = new ServiceFile('public/uploads')
const csv = new ServicesCsv('public/uploads')

export async function validateCSV(req, res, next) {
  try {
    const fileEntidad = req.file
    const { diccionario } = req.body
    const csvtojson = await csv.csvtojson({ file: fileEntidad.filename })
    await fs.deleteFile({ file: req.file.filename })
    const dicc = new ServicesDiccionaryValidate(csvtojson, diccionario)
    await dicc.getValidTotalColumnas()
    await dicc.getValidNamesColumns()
    await dicc.getValidDatatype()

    success(req, res, { fileEntidad })
  } catch (error) {
    next(error)
  }
}
