import React, { Component } from 'react';
import CompaniesList from './CompaniesList';
import { connect } from "react-redux";
import { fetchCompanies } from "../actions";
import { Button } from 'semantic-ui-react';

class OrderForm extends Component {
  componentDidMount() {
    this.props.fetchCompanies();
  }

  render() {
    return (

        <div id="form-wrapper" className="open container container-small">

          <div id="content-wrapper">
            <div className="page-content">

              <div className="row">
                <div className="col-xs-12">
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


                      <form className="ui form">
                        <div className="field">
                          <label htmlFor="company">Nom de la structure</label>
                          <input type="text" id="company" />
                        </div>

                        <div className="field">
                          <div className="checkbox">
                            <label><input type="checkbox" /> Associé à une Banque Alimentaire</label>
                            &nbsp;
                            <select>
                              <option>Bordeaux</option>
                              <option>Montpellier</option>
                              <option>...</option>
                            </select>
                          </div>
                        </div>

                        <div className="gray-row">

                          <div className="field">
                            <label htmlFor="nb_products">Nombre d&#39;exemplaire</label>&nbsp;
                            <select id="nb_products">
                              <option value="25">25 = 12,50€</option>
                              <option value="50">50 = 25€</option>
                              <option value="100">100 = 50€</option>
                              <option value="150">150 = 75€</option>
                              <option value="200">200 = 100€</option>
                              <option>...</option>
                            </select>
                          </div>

                          <div className="field">
                            <div className="radio">
                              <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked />
                                 Option 1: Livraison chez vous = 30€
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
                                Option 2: Livraison chez votre Banque Alimentaire = 0€ !!!!
                              </label>
                            </div>
                          </div>

                        </div>

                        <div className="field">
                          <label htmlFor="address1">Adresse de livraison</label>
                          <input type="text" id="address1" placeholder="Ligne 1"/>
                          <input type="text" id="address2" placeholder="Ligne 2"/>
                        </div>

                        <div className="field">
                          <label htmlFor="address1">Adresse de facturation</label>
                          <input type="text" id="address1" placeholder="Ligne 1"/>
                          <input type="text" id="address2" placeholder="Ligne 2"/>
                        </div>

                        <div className="field">
                          <label htmlFor="contact_name">Nom et prénom de la/du responsable de la commande</label>
                          <input type="text" id="contact_name" />
                        </div>

                        <div className="field">
                          <label htmlFor="contact_email">Email</label>
                          <input type="email" id="contact_email" />
                        </div>

                        <div className="field">
                          <label htmlFor="contact_mobile">Téléphone mobile</label>
                          <input type="text" id="contact_mobile" />
                        </div>

                        <div className="field">
                          <label htmlFor="contact_phone">Téléphone fix</label>
                          <input type="text" id="contact_phone" />
                        </div>
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
                        <div className="field">
                        <Button type="submit">
                          Commander
                        </Button>
                          <button type="submit" className="ui primary button">Commander</button>
sdqdqdqdqdqdsqdqd                        </div>
                      </form>

                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

    )
  }
}

OrderForm.propTypes = {
  companies: React.PropTypes.array.isRequired,
  fetchCompanies: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    companies: state.companies
  }
}

export default connect(mapStateToProps, { fetchCompanies })(OrderForm);
