import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat' 

dayjs.extend(customParseFormat)

const dayJs = dayjs

export default dayJs