function smtd_sibling(id){ //switch smpl/trad around
    var sibling = ["smpl", "trad"].filter(function(e) { return e !== id }).toString();
    if (document.getElementById(sibling).checked == true) {
        // if checked
        document.getElementById(sibling).checked = false;
        document.getElementById(sibling+"-no").value = "";
    }
    if (document.getElementById(id).checked == true){
        if (parseInt(document.getElementById(id+"-no").value)){
            document.documentElement.style.setProperty("--"+id, parseInt(document.getElementById(id+"-no").value));
        } else {
            document.documentElement.style.setProperty("--"+id, 1);
            document.getElementById(id+"-no").value = 1;
        }
    } else { //uncheck
        document.documentElement.style.setProperty("--"+id, 0);
        document.getElementById(id+"-no").value = "";
    }
    document.documentElement.style.setProperty("--"+sibling, 0); //turn off sibling funtion
    return sibling;
}
function check_smtd_no(id){  //choose which trad to use
    if (document.getElementById(id).checked == false) {
        // check input checkbox
        document.getElementById(id).checked = true;
    }
    var sibling = smtd_sibling(id); //get sibling
    var opentype_str = document.getElementById(id+"-no").value; //get input str
    //check if input str is not empty
    if (opentype_str != ""){
        opentype_num = parseInt(opentype_str);
    } else {
        document.getElementById(id).checked = false; //uncheck
        return 0;
    }

    var root_style = document.documentElement.style; //get css section
    if (opentype_num <= 5 && opentype_num >= 1){
        root_style.setProperty("--"+id, opentype_num); //set css with this number
        return opentype_num;
    } else {
        window.alert("請輸入 1-5 之間的整數。");
        document.getElementById(id).checked = false; //uncheck
        document.getElementById(id+"-no").value = ""; //reset input to empty
        root_style.setProperty("--"+id, 0); //reset css for this number
        return 0;
    }
}
function set_lang(lang_id_name){ //set lang for teting area
    let lang_name = lang_id_name.substring(5);
    document.getElementById("testing-div").setAttribute("lang", lang_name)
}