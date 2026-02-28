export default class cartPage{
    get pageTitle(){
        return $('id:com.androidsample.generalstore:id/toolbar_title');
    }

    get totalAmount(){
        return $('id:com.androidsample.generalstore:id/totalAmountLbl');
    }
}