import { sp, UserIdInfo, Web } from '@pnp/sp';
import { ITerm, ITermData, ITerms, ITermSet, ITermSetData, Term } from '@pnp/sp-taxonomy';

import { Constants } from './Constants';

export abstract class Taxonomy {
  public async getCurrentUserTerm(termSet: ITermSet): Promise<ITerm> {
    let term: ITerm = new Term();
    const curUserData = await sp.web.currentUser.get();
    const items = await sp.web.lists
      .getByTitle(Constants.EMPLOYEE_LIST_TITLE)
      .items.filter(Constants.AccountNameFieldName + " eq '" + curUserData.LoginName.split('\\')[1] + "'")
      .get();
    if (items && items.length > 0) {
      const termGuid = items[0][Constants.OrganisationUnitFieldName].TermGuid;
      term = termSet.getTermById(termGuid);
    }
    return term;
  }

  public async getParentTerms(termData: (ITermData & ITerm)): Promise<Array<(ITermData & ITerm)>> {
    const parents: ITerm[] = new Array<ITermData & ITerm>();
    if (termData.PathOfTerm) {
      const numberOfParents = termData.PathOfTerm.split(';').length - 1;
      for (let index = 0; index < numberOfParents; index++) {
        termData = await termData.parent.get();
        parents.push(termData);
      }
    }
    return parents;
  }

  public async getTermByName(label: string, termSet: ITermSet): Promise<ITerm> {
    const termsColl: ITerms = termSet.terms;
    const termsWithData = await termSet.terms.get();
    const terms: Array<ITermData & ITerm> = termsWithData.filter(x => x.Name === label);
    if (terms.length > 0) {
      return terms[0];
    } else {
      return new Term();
    }
  }

  public async getWssIdsFor(termsData: (ITermData & ITerm)[], termSetData: (ITermSetData & ITermSet)) {
    const wssIDs: number[] = [];
    for (const termData of termsData) {
      //const termData = await term.get();
      // const termSetData = await termSet.get();
      // const termSet = await terms[index].termSet.get();
      if (termData.Id && termSetData.Id) {
        const wss = await sp.web.lists
          .getByTitle('TaxonomyHiddenList')
          .items.select('ID')
          .filter(
            "IdForTerm eq '" +
              this.getIdFromGUID(termData.Id) +
              "' and IdForTermSet eq '" +
              this.getIdFromGUID(termSetData.Id) +
              "'",
          )
          .getAll();

        wss.forEach((element, i, array) => {
          wssIDs.push(element.ID);
        });
      }
    }
    return wssIDs;
  }

  public getIdFromGUID(id: string) {
    id = id.replace('/Guid(', '');
    id = id.replace(')/', '');
    return id;
  }

  public getWssIdsValuesStringForCamlQuery(wssIds: number[]) {
    if (wssIds.length > 0) {
      let resultString = '<Values>';
      wssIds.forEach((element, index, array) => {
        resultString += "<Value Type='Integer'>" + element + '</Value>';
      });
      resultString += '</Values>';
      return resultString;
    }
    return '';
  }
}
