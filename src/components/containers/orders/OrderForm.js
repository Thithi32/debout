import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchCompanies, fetchHubs, createOrder } from "./../../../actions";
import { Field, reduxForm, formValueSelector, FormSection } from 'redux-form';

const packs = [
  { nb: 10, shipping: 10 },
  { nb: 25, shipping: 22 },
  { nb: 50, shipping: 30 },
  { nb: 100, shipping: 38 },
  { nb: 150, shipping: 42 },
  { nb: 200, shipping: 50 },
  { nb: 250, shipping: 53 },
  { nb: 300, shipping: 58 },
  { nb: 350, shipping: 65 },
  { nb: 400, shipping: 70 },
  { nb: 450, shipping: 80 },
  { nb: 500, shipping: 90 },
  { nb: 600, shipping: 102 },
  { nb: 700, shipping: 120 },
  { nb: 800, shipping: 135 },
  { nb: 900, shipping: 150 },
  { nb: 1000, shipping: 170 }
];


class Address extends Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="address1">{ this.props.title }</label>
          <Field component="input" className="form-control" type="text" name="address1" placeholder="Ligne 1" />
          <Field component="input" className="form-control" type="text" name="address2" placeholder="Ligne 2" />
          <Field component="input" className="form-control" type="text" name="zipCode" placeholder="Code postal" />
          <Field component="input" className="form-control" type="text" name="city" placeholder="Commune" />
        </div>
      </div>
    )
  }
}

class Contact extends Component {
  render() {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="contact_name">Nom et prénom de la/du responsable de la commande</label>
          <Field component="input" className="form-control" type="text" name="contact_name" />
        </div>

        <div className="form-group">
          <label htmlFor="contact_email">Email</label>
          <Field component="input" className="form-control" type="email" name="contact_email" />
        </div>

        <div className="form-group">
          <label htmlFor="contact_mobile">Téléphone mobile</label>
          <Field component="input" className="form-control" type="text" name="contact_mobile" />
        </div>

        <div className="form-group">
          <label htmlFor="contact_phone">Téléphone fix</label>
          <Field component="input" className="form-control" type="text" name="contact_phone" />
        </div>
      </div>
    )
  }
}

class OrderForm extends Component {

  componentDidMount() {
    this.props.fetchCompanies();
    this.props.fetchHubs();
  }

  getHubOptions() {
    return this.props.hubs.map((hub, idx) => { return { key: idx, value: hub.name, text: hub.name}; });
  }

  FieldNbProducts(fieldProps) {
    let { price, ...other } = fieldProps;
    return (
      <Field component="select" {...other}>
          <option key={ 0 } value="0">Choisir le nombre d&#39;exemplaires</option>  
        { packs.map((pack,i) =>
          <option key={ i } value={ pack.nb }>{ pack.nb } exemplaires = { pack.nb * price }€</option>  
        )}
      </Field>
    )
  }

  FieldHub(fieldProps) {
    let { options, ...other } = fieldProps;
    return (
      <Field {...other} component="select">
          <option key={ 0 } value="0">Choisir votre hub</option>  
        { options.map((option) =>
          <option key={ option.key } value={ option.value }>{ option.text }</option>  
        )}
      </Field>
    )
  }

  render() {
    const { handleSubmit, is_ngo, has_hub, hub, nb_products, shipping_option, use_invoice_address, pristine, submitting } = this.props;

    const price = (is_ngo) ? 0.5 : 1.5;

// eslint-disable-next-line
    const hub_shipping_available = has_hub && is_ngo && !(hub <= 0);

    let shipping_option_valid = (hub_shipping_available && shipping_option) ? shipping_option : 1;

    let shipping_price = 0;
    for (var i = 0; i < packs.length; i++) {
// eslint-disable-next-line
      if (packs[i].nb == nb_products) {
        shipping_price = packs[i].shipping;
      }
    }

// eslint-disable-next-line
    let total = nb_products * price + ((shipping_option_valid == 2) ? 0 : shipping_price);
    if (!total || isNaN(total) || (total < 0)) total = 0;

    let use_invoice_address_valid = (use_invoice_address == undefined) ? true : use_invoice_address;

    return (

      <div className="widget">

        <div className="widget-header">
          <img className="pull-left" src="img/logo_mini.jpg" alt="Logo Debout" />

          <h2>BON DE COMMANDE</h2>
          <h3><strong>debout n°12</strong> // <span className="small">juin - juillet - août 2017</span> </h3>
        </div>

        <div className="widget-body">

          <p>
            Bon de commande à remplir <strong>&rArr; AVANT le 10 juin 2017</strong><br />
            Pour toute information, contactez-nous par mail à&nbsp;
            <a href="mailto:diffusion@debout.fr">diffusion@debout.fr</a><br/>
          </p>


          <form onSubmit={ handleSubmit }>

            <div className="form-group">
              <label htmlFor="company">Nom de la structure</label>
              <Field name="company" component="input" type="text" className="form-control"/>          
            </div>

            <div className="form-group">
              <div className="checkbox">
                <label>
                  <Field name="is_ngo" component="input" type="checkbox"/> 
                  Association à but non lucratif
                </label>
              </div>
            </div>

            { is_ngo && 
              <div className="form-group">
                <div className="checkbox">
                  <label>
                    <Field name="has_hub" component="input" type="checkbox"/> 
                    Vous êtes associé à une Banque Alimentaire
                  </label>
                </div>
              </div>
            }

            { has_hub && 
              <div className="form-group">
                <label htmlFor="hub">Quelle est votre Banque Alimentaire?</label>
                <this.FieldHub name="hub" className="form-control" options={ this.getHubOptions() }/>
              </div>
            }

            <div className="gray-row">

              <div className="form-group">
                <label htmlFor="nb_products">Nombre d&#39;exemplaires</label>
                <this.FieldNbProducts name="nb_products" className="form-control" price={price}/>
                <small>À noter : Un paquet de 25 exemplaires du magazine pèse environ 3,5 kg.</small>
              </div>

              { hub_shipping_available &&
                <div className="form-group">
                  <div className="radio">
                    <label>
                      <Field component="input" type="radio" name="shipping_option" value="1" checked={shipping_option_valid==1}/>
                       Option 1: Livraison chez vous = { shipping_price }€
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <Field component="input" type="radio" name="shipping_option" value="2" checked={shipping_option_valid==2}/>
                      Option 2: Livraison chez votre Banque Alimentaire = 0€ !!!!
                    </label>
                  </div>
                </div>
              }

              { !hub_shipping_available &&
                <div>
                  Livraison chez vous = { shipping_price }€
                </div>
              }

              <div className="total">
                <h3>Total: { total }€</h3>
              </div>

            </div>

            { total>0 &&

              <div>

                <FormSection name="invoice_address">
                  <Address title="Adresse de facturation"/>
                </FormSection>

                { shipping_option_valid == 1 &&
                  <FormSection name="shipping_address">
                    <div className="form-group">
                      <div className="checkbox">
                        <label>
                          <Field name="use_invoice_address" component="input" type="checkbox" checked={use_invoice_address_valid} /> 
                          Utiliser l&#39;adresse de facturation pour la livraison
                        </label>
                      </div>
                    </div>
                    { !use_invoice_address_valid &&
                      <Address title="Adresse de livraison"/>
                    }
                  </FormSection>
                }

                <FormSection name="contact">
                  <Contact/>
                </FormSection>

                <div>
                  <p>
                    <small>
                      En envoyant ce bon de commande, je m’engage, dans le cadre de l’Option 1
                      , à régler les frais de livraison et de traitement de ma commande à réception de la facture, et
                      , dans le cadre de l’Option 2, à respecter les dates de récupération de ma commande
                       sur la plateforme relais de distribution que j’ai choisie. <br />
                      <strong>Ce bon de commande vaut commande définitive.</strong>
                    </small>
                  </p>
                </div>
                <div className="form-group">
                  <button type="submit" disabled={pristine || submitting}>
                    Commander
                  </button>
                </div>
              </div>
            }
          </form>

        </div>
      </div>
    )
  }
}

OrderForm = reduxForm({
  form: 'order'
}, null, { createOrder })(OrderForm);

OrderForm.propTypes = {
  companies: React.PropTypes.array.isRequired,
  fetchCompanies: React.PropTypes.func.isRequired,
  hubs: React.PropTypes.array.isRequired,
  fetchHubs: React.PropTypes.func.isRequired
}

const selector = formValueSelector('order');
function mapStateToProps(state) {
  return {
    companies: state.companies,
    hubs: state.hubs,
    is_ngo: selector(state, 'is_ngo'),
    has_hub: selector(state, 'has_hub'),
    hub: selector(state, 'hub'),
    nb_products: selector(state, 'nb_products'),
    shipping_option: selector(state, 'shipping_option'),
    use_invoice_address: selector(state, 'shipping_address.use_invoice_address')
  }
}

export default connect(mapStateToProps, { fetchCompanies, fetchHubs })(OrderForm);
