export const convertDataToHtml = (blocks) => {
  var convertedHtml = "";
  blocks?.map((block) => {
    switch (block.type) {
      case "header":
        convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;
      case "embded":
        convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
        break;
      case "paragraph":
        convertedHtml += `<p>${block.data.text}</p>`;
        break;
      case "checklist":
        const list = block.data.items.map((item) => {
          return `<div class="_1checkbox">
            <span class=${
              item.checked === true ? "_1checkbox_actived" : "_1checkbox_round"
            }></span>
            ${item.text}</div>`;
        });
        convertedHtml += `<section class="nws3_sec4">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="table_top_sec">
                    ${list.join("")}
                </div>
            </div>
        </div>
    </section>	`;
        break;
      case "code":
        convertedHtml += `<pre>
                              <code class="code">                               
                             <div> ${block.data.code}</div>
                              </code>
                            </pre>`;
        break;
      case "raw":
        convertedHtml += `<pre>
                              <code class="html">
                             <div> ${block.data.html}</div>
                              </code>
                            </pre>`;
        break;
      case "delimiter":
        convertedHtml += "<hr />";
        break;
      case "quote":
        convertedHtml += `<div class="spcl_line mar_b30">
          <blockquote>
              <p class="spcl_line_p">
                  ${block.data.text}
              </p>
          </blockquote>
          <p>Автор - ${block.data.caption}</p>
      </div>`;
        break;
      case "image":
        convertedHtml += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
        break;
      case "list":
        convertedHtml += "<ul>";
        block.data.items.forEach(function (li) {
          convertedHtml += `<li>${li}</li>`;
        });
        convertedHtml += "</ul>";
        break;
      default:
        console.log("Unknown block type", block.type);
        break;
    }
  });
  return convertedHtml;
};
