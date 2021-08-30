(  
    // pop-images : 이미지가 들어갈 위치 id, btn : file tag id 
    imageView = function imageView(pop_images, btn) {
        var popImages = document.getElementById(pop_images);
        var btn_att = document.getElementById(btn);
        var sel_files = [];
        var max = 5;
        var fileCount = 0;

        btn_att.onchange = function(e) {
            var files = e.target.files;
            var fileArr = Array.prototype.slice.call(files);
            for( f of fileArr ) {
                imageLoader(f);
            }
        }

        popImages.addEventListener('dragenter', function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, false)

        popImages.addEventListener('drageover', function(e) {
            e.preventDefault();
            e.stopPropagation();
        }, false)
        popImages.addEventListener('drop', function(e) {
            var files = {};
            e.preventDefault();
            e.stopPropagation();
            var dt = e.dataTransfer;
            files = dt.files;
            for( f of files ) {
                imageLoader(f);
            }
        }, false)

        imageLoader = function(file) {
            sel_files.push(file);
            if (!/\.(jpe?g|png|gif|svg)$/i.test(file.name)) {
                return alert(file.name + " is not an image");
            }

            var tempCount = fileCount;
            tempCount += sel_files.length;

            if(max >= tempCount) {
                var reader = new FileReader();
                reader.onload = function(ee) {
                    let img = document.createElement('img');
                    img.src = ee.target.result;
                    popImages.appendChild(makeDiv(img, file));
                }
                reader.readAsDataURL(file);
                console.log(imageLoader)
            } else {
                alert("최대 5개 등록 가능합니다.");
                tempCount -= sel_files.length;
                return false;
            }
            
        }

        makeDiv = function(img,file) {
            var div = document.createElement('div');
            var btn = document.createElement('input');
            div.setAttribute('class', 'img')
            btn.setAttribute('type', 'button')
            btn.setAttribute('value', 'x')
            btn.setAttribute('delFile', file.name)
            btn.setAttribute('class', 'chk')
            // btn.setAttribute('accept', '.jpg, .jpeg, .png, .gif')
            btn.onclick = function(ev) {
                var ele = ev.target;
                var delFile = ele.getAttribute('delFile');

                for(var i=0; i<sel_files.length; i++) {
                    if(delFile==sel_files[i].name) {
                        sel_files.splice(i, 1);
                    }
                    
                }
                
                dt = new DataTransfer();
                for(f in sel_files) {
                    var file = sel_files[f];
                    // dt.itmes.add(file);
                }
                btn_att.file = dt.files;
                var p = ele.parentNode;
                popImages.removeChild(p);
                console.log(ele)
            }
            div.appendChild(img);
            div.appendChild(btn);
            return div;
        }

    }
)('pop_images', 'btn_att')

function codeShow() {
    const codebox = document.querySelector('.code-box')
    codebox.classList.toggle('active');
}