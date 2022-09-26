var baseUrl = 'https://www.soimweb.com.br/orbitabar/listas/';
function Orbita()
{
  Orbita.prototype.getToken = function(){
    return sessionStorage.getItem("OrbitaBarToken");
  };

  Orbita.prototype.getUserInfo = function(editar){
    $.post(baseUrl + 'webservice/cliente/get-user-info',
    {
      token: this.getToken()
    }, function(callback)
    {
      if (callback.status == 1)
      {
        if (editar)
        {
          $('#nome').val(callback.data.nome);
          $("#email").val(callback.data.email);
          $("#sexo").val(((callback.data.sexo == 'Masculino') ? 0 : 1));
          $("#telefone").val(callback.data.telefone);
          $("#data_nascimento").val(callback.data.data_nascimento);
          $('#token').val(_orbita.getToken());
        }else
        {
          $('#nome_usuario').text(callback.data.nome);
          $(".nome").text(callback.data.nome);
          $(".email").text(callback.data.email);
          $(".sexo").text(callback.data.sexo);
          $(".telefone").text(callback.data.telefone);
          $(".nascimento").text(callback.data.data_nascimento);
          $(".documento").attr('href', baseUrl + '/public/images/ids/' + callback.data.documento);
        }

      }else {
        window.location = 'https://orbitabar.com.br/listas-de-aniversario/';
      }
    }, 'json');
  };

  Orbita.prototype.loginByEmail = function(editar){
    $.post(baseUrl + 'webservice/cliente/get-info-by-email',
    {
      token: this.getToken(),
      email: $('#email').val(),
      senha: $('#senha').val()
    }, function(callback)
    {
      if (callback.status == 1)
      {
        sessionStorage.setItem("OrbitaBarToken", callback.data.token);
        window.location = "https://orbitabar.com.br/listas-de-aniversario/logado";
      }else {
        window.location = 'https://orbitabar.com.br/listas-de-aniversario/';
      }
    }, 'json');
  };

  Orbita.prototype.getUserParties = function(){
    $.post(baseUrl + 'webservice/lista/get-user-parties',
    {
      token: this.getToken()
    }, function(callback)
    {
      if (callback.status == 1)
      {
        if (callback.data.length > 0)
        {
          var html = '';
          for (var i in callback.data)
          {
            html += '<div id="linha_historico">';
        	     html += '<div id="col-1">';
                	html += '<span>' + callback.data[i].data_lista + '</span>';
                html += '</div>';
                html += '<div id="col-2">';
                	html += callback.data[i].status;
                html += '</div>';
            html += '</div>';
          }

          $('#historico_usuario').html(html);
        }
      }else {
        window.location = 'https://orbitabar.com.br/listas-de-aniversario/';
      }
    }, 'json');
  };

  Orbita.prototype.logout = function(){
    sessionStorage.clear();
    window.location = 'https://orbitabar.com.br/listas-de-aniversario/';
  };

  Orbita.prototype.solicitar = function(){
    $.post(baseUrl + 'webservice/lista/solicitar',
    {
      token: this.getToken(),
      data_comemoracao: $('#data_comemoracao').val(),
      acompanhante: $('#acompanhante').val()
    }, function (callback)
    {
      window.location = callback.redirect;
    }, 'json');
  };

  Orbita.prototype.getListaInfo = function(lista){
    $.post(baseUrl + 'webservice/lista/get-info',
    {
      token: this.getToken(),
      lista: lista
    }, function (callback)
    {
      if (callback.status == 0)
        window.location = callback.redirect;
      else
      {
        if (callback.dados.length > 0)
        {
          var html = '';
          for (var i in callback.dados)
          {
            html += '<div id="linha">';
		          html += '<div id="col-1">';
			           html += '<span>' + callback.dados[i].nome + '</span>';
              html += '</div>';
							html += '<div id="col-2">';
					       html += '<span><a href="javascript:void(0);" onclick="_orbita.removerConvidado(\'' + callback.dados[i].id + '\', this);">EXCLUIR</a></span>';
							html += '</div>';
  					html += '</div>';
          }

          $('#preenchaform').append(html);
          $('#qtdConvidados').text(callback.dados.length);
        }
      }
    }, 'json');
  }

  Orbita.prototype.adicionarConvidado = function(lista, convidadoNome)
  {
    if (convidadoNome == '')
    {
      alert('Preencha o nome do convidado antes de enviar.');
      return;
    }
    $.post(baseUrl + 'webservice/lista/adicionar-convidado',
    {
      token: this.getToken(),
      lista: lista,
      nome: convidadoNome
    }, function(callback)
    {
      if (callback.status == 1)
      {
        var html = '';
        html += '<div id="linha">';
          html += '<div id="col-1">';
             html += '<span>' + convidadoNome + '</span>';
          html += '</div>';
          html += '<div id="col-2">';
             html += '<span><a href="javascript:void(0);" onclick="_orbita.removerConvidado(\'' + callback.dados.id +'\', this);">EXCLUIR</a></span>';
          html += '</div>';
        html += '</div>';

        $('#preenchaform').append(html);
        var qtdConvidados = ($('#qtdConvidados').text()*1)+1;
        $('#qtdConvidados').text(qtdConvidados);
      }else
        alert(callback.msg);
    }, 'json');
  };

  Orbita.prototype.removerConvidado = function(convidado, obj)
  {
    if (convidadoNome == '')
    {
      alert('Convidado inválido.');
      return;
    }

    var confirmacao = confirm('Tem certeza que deseja remover este usuário?\nEsta ação não poderá ser desfeita.');
    if (confirmacao)
    {
      $.post(baseUrl + 'webservice/lista/remover-convidado',
      {
        token: this.getToken(),
        convidado: convidado
      }, function(callback)
      {
        if (callback.status == 1)
        {
          $(obj).parent().parent().parent().remove();
          var qtdConvidados = ($('#qtdConvidados').text()*1)-1;
          $('#qtdConvidados').text(qtdConvidados);
        }else
          alert(callback.msg);
      }, 'json');
    }
  };

  Orbita.prototype.enviarConvidados = function(lista)
  {
    if (lista == '')
      alert('Lista inválida.')
    var confirmacao = confirm('Tem certeza que deseja enviar os convidados?\nApós esta ação, você não poderá mais editar.');
    if (confirmacao)
    {
      $.post(baseUrl + 'webservice/lista/enviar-convidados',
      {
        token: this.getToken(),
        lista: lista
      }, function(callback)
      {
        if (callback.status == 1)
        {
          window.location = window.location;
        }else
          alert(callback.msg);
      }, 'json');
    }
  };
}

var _orbita = new Orbita();
