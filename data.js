function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('to');
    console.log(myParam);
    if (myParam == null || myParam == '') {
        window.location.href = location.protocol + '//' + location.host + location.pathname+'?to=Tamu';
    } else {
        const tamu = myParam.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        $('.nmt').text(tamu);
    }

    const digits = Math.floor(Math.random() * 9000000000) + 1000000000;
    fetch('./data.json?date='+digits)
    .then((response) => response.json())
        .then((json) => {
            if (json.length > 0) {
                console.log('ada');
                let html = '';
                json.forEach(function (item) {
                    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
                    let icon = 'hadir.svg';

                    if (item.hadir == 'tidak') {
                        icon = 'tidakhadir.svg';
                    } else if (item.hadir == 'ragu') {
                        icon = 'ragu.svg';
                    }

                    const nama = (item.nama).toLowerCase().replace(/\b[a-z]/g, function(letter) {
                        return letter.toUpperCase();
                    });

                    const ket = (item.keterangan).charAt(0).toUpperCase() + (item.keterangan).slice(1);

                    html += '<li class="comment even thread-even depth-1 saic-item-comment" id="saic-item-comment-352855" data-likes="0">\
                    <div id="saic-comment-352855" class="saic-comment saic-clearfix">\
                       <div class="saic-comment-avatar">\
                          <img alt="" src="https://ui-avatars.com/api/?name='+item.nama+'&amp;rounded=true&amp;bold=true&amp;format=svg&amp;background='+randomColor+'&amp;color=fff" srcset="https://ui-avatars.com/api/?name='+item.nama+'&amp;rounded=true&amp;bold=true&amp;format=svg&amp;background='+randomColor+'&amp;color=fff 2x" class="avatar avatar-96 photo" height="96" width="96" decoding="async">\
                       </div>\
                       <!--.saic-comment-avatar-->\
                       <div class="saic-comment-content">\
                          <div class="saic-comment-info">\
                             <div class="namebox">\
                                <a class="saic-commenter-name" title="$autor_name">'+nama+'</a>\
                                <div class="infotip saic-post-author"><img src="'+icon+'">\
                                   <span class="infotiptext">'+item.hadir+'</span>\
                                </div>\
                             </div>\
                             <span class="saic-comment-time">\
                             <i class="far fa-clock"></i>\
                             '+item.waktu+'          </span>\
                          </div>\
                          <!--.saic-comment-info-->\
                          <div class="saic-comment-text">\
                             <p>'+ket+'</p>\
                          </div>\
                          <!--.saic-comment-text-->\
                          <div class="saic-comment-actions" style="display: none;">\
                          </div>\
                          <!--.saic-comment-actions-->\
                       </div>\
                       <!--.saic-comment-content-->\
                    </div>\
                    <!--.saic-comment-->\
                    <!--</li>-->\
                 </li>';
                });
                $('#saic-container-comment-95865').html(html);
            } else {
                console.log('tak ada');
            }
        });
}
$(document).ready(function(){
    getData();

    // $('.nices').sakura('start', {
    //     fallSpeed: 3,        // Factor for petal fall speed         
    // });
    new Sakura('.nices1', {
        fallSpeed: 1
    });
    new Sakura('.nices2',{
        fallSpeed: 2
    });
    new Sakura('.nices3',{
        fallSpeed: 3
    });
    new Sakura('.nices4',{
        fallSpeed: 4
    });
    new Sakura('.nices5',{
        fallSpeed: 5
    });
    new Sakura('.nices6',{
        fallSpeed: 6
    });
});

function AjaxCallWithPromise(data) {
    return new Promise(function (resolve, reject) {
        const objXMLHttpRequest = new XMLHttpRequest();
        objXMLHttpRequest.onreadystatechange = function () {
            if (objXMLHttpRequest.readyState === 4) {
                if (objXMLHttpRequest.status == 200) {
                    resolve(objXMLHttpRequest.responseText);
                } else {
                    reject('Error Code: ' +  objXMLHttpRequest.status + ' Error Message: ' + objXMLHttpRequest.statusText);
                }
            }
        }
        objXMLHttpRequest.open('GET', 'submit.php?data='+data);
        objXMLHttpRequest.send();
    });
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

$(document).on('click', '#submit-95865', function () {
    
    const nama = $('.input-nama').val();
    const keterangan = $('.input-keterangan').val();
    const hadir = $('.input-hadir').val();

    if (nama.replace(/\s/g, '') == '') {
        $('.input-nama').val('');
        $('.input-nama').focus();
        return;
    }

    if (keterangan.replace(/\s/g, '') == '') {
        $('.input-keterangan').val('');
        $('.input-keterangan').focus();
        return;
    }
    $('#submit-95865').prop('disabled', true);
    $('.loader').show();

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let jam = date.getHours();
    let menit = date.getMinutes();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year} ${jam}:${menit}`;

    const data = {
        "nama": nama,
        "keterangan": keterangan,
        "waktu": currentDate,
        "hadir": hadir
    }

    const digits = Math.floor(Math.random() * 9000000000) + 1000000000;
    fetch('./data.json?date='+digits)
        .then((response) => response.json())
        .then((json) => {
            json.unshift(data);
            console.log(json);
            
            delay(1000).then(() => {
                Swal.fire(
                    'Tersimpan',
                    'Terimakasih telah memberikan doa dan ucapan untuk kedua mempelai',
                    'success'
                ).then(() => {
                    AjaxCallWithPromise(btoa(JSON.stringify(json))).then(
                        data => { console.log('Success Response: ' + data) },
                        error => { console.log(error) }
                    );

                    delay(1000).then(() => {
                        getData();
                    });
                    
                    $('.loader').hide();
                    $('.input-keterangan').val('');
                    $('.input-nama').val('').focus();
                    $('#submit-95865').prop('disabled', false);
                  })
                
            });
        });
})
