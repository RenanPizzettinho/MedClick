import RestService from './restHttpMethodService';
import {usuarioPath, medicoPath, pesquisaMedicoPath} from './webPathService';

const MedicoSevice = {
    salvar: salvar,
    get: get,
    atualizar: atualizar,
    pesquisar: pesquisar,
};

function salvar(user, body) {
    return RestService.post(`${usuarioPath}/${user}/${medicoPath}`, body);
}

function get(user) {
    return RestService.get(`${usuarioPath}/${user}/${medicoPath}`);
}

function atualizar(user, body) {
    return RestService.put(`${usuarioPath}/${user}/${medicoPath}`, body);
}

function pesquisar(parametro) {
    return RestService.get(`${pesquisaMedicoPath}${parametro}`);
}
export default MedicoSevice;
