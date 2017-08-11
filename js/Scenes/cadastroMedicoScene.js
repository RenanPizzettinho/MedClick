import React, {Component} from "react";

import {ToastAndroid} from "react-native";
import CadastroMedicoComponent from "../Component/Telas/CadastroMedicoComponent";
import StaticStorageService from "../Services/staticStorageService";
import MedicoService from "../Services/medicoService";
import SceneEnum from '../Enums/SceneEnum';

export default class CadastroMedicoScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            crm: '',
            especialidade: '',
            atendeEm: '',
            segunda: false,
            terca: false,
            quarta: false,
            quinta: false,
            sexta: false,
            sabado: false,
            domingo: false
        }
    }


    render() {
        return (
            <CadastroMedicoComponent
                states={this.state}
                salvar={this.salvarMedico}
                fetchData={this.fetchData}
                navigation={this.props.navigation}
            />
        );
    }

    fetchData() {
        const userId = StaticStorageService.usuarioSessao._id;
        MedicoService.get(userId)
            .then((response) => {
                let dados = response.data[0];

                if (dados === undefined) return;

                this.setState({
                    idMedico: dados._id,
                    crm: dados.crm,
                    atendeEm: dados.atendeEm,
                    especialidade: dados.especialidade
                });

                dados.diasAtendimentoDomicilio.forEach((item) => {
                    switch (item) {
                        case 'seg':
                            this.setState({segunda: true});
                            break;
                        case 'ter':
                            this.setState({terca: true});
                            break;
                        case 'qua':
                            this.setState({quarta: true});
                            break;
                        case 'qui':
                            this.setState({quinta: true});
                            break;
                        case 'sex':
                            this.setState({sexta: true});
                            break;
                        case 'sab':
                            this.setState({sabado: true});
                            break;
                        case 'dom':
                            this.setState({domingo: true});
                            break;
                    }
                });

            });
    }

    async salvarMedico() {
        let form = {
            crm: this.state.crm,
            especialidade: this.state.especialidade,
            atendeEm: this.state.atendeEm,
            diasAtendimentoDomicilio: []
        };

        if (this.state.segunda)
            form.diasAtendimentoDomicilio.push('seg');

        if (this.state.terca)
            form.diasAtendimentoDomicilio.push('ter');

        if (this.state.quarta)
            form.diasAtendimentoDomicilio.push('qua');

        if (this.state.quinta)
            form.diasAtendimentoDomicilio.push('qui');

        if (this.state.sexta)
            form.diasAtendimentoDomicilio.push('sex');

        if (this.state.sabado)
            form.diasAtendimentoDomicilio.push('sab');

        if (this.state.domingo)
            form.diasAtendimentoDomicilio.push('dom');

        const userId = StaticStorageService.usuarioSessao._id;

        const {navigate} = this.props.navigation;

        if (!this.state.idMedico) {
            MedicoService.salvar(userId, form)
                .then((response) => {
                    ToastAndroid.showWithGravity('Informações de médico atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    navigate(SceneEnum.MENU);
                });
        } else {
            MedicoService.atualizar(userId, form)
                .then((response) => {
                    ToastAndroid.showWithGravity('Informações de médico atualizadas', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                    navigate(SceneEnum.MENU);
                });
        }


    }
}