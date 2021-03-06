import React, {Component} from "react";
import {Alert, ToastAndroid} from "react-native";
import UsuarioService from "../Services/usuarioService";
import CadastroUsuarioComponent from "../Component/Telas/CadastroUsuarioComponent";
import SceneEnum from '../Enums/SceneEnum';


export default class CadastroUsuarioScene extends Component {

  static navigationOptions = {
    title: 'Cadastro de usuários',
    headerRight: null
  };

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      senha: '',
      verificarSenha: ''
    }
  }

  render() {
    return (<CadastroUsuarioComponent
      salvar={this.salvar}
      states={this.state}
      disabled={this.disabled}
      navigation={this.props.navigation}
    />);
  }

  salvar(state) {
    const {navigate} = this.props.navigation;

    if (state.senha !== state.verificarSenha) {
      Alert.alert('Atenção', 'A senha informada não confere com a verificação!');
      return;
    }

    if (state.senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve conter ao menos 6 caracteres!');
      return;
    }

    const form = {
      nome: state.nome,
      email: state.email,
      senha: state.senha
    };

    UsuarioService.cadastrar(form)
      .then((responseJson) => {
        if (responseJson.data._id) {
          ToastAndroid.showWithGravity('Usuário cadastrado', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
          navigate(SceneEnum.LOGIN);
        }
      });

  }

  disabled(state) {
    return !state.email || !state.nome || !state.senha || !state.verificarSenha;
  }
}