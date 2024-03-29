<h1 align="center">Linkedin Analysis of a Polarizing Post on Abortion<br>(in Portugal)</h1>
<h3 align="center">How to scrape a linkedin post + What we can learn from it.</h3>

  1. [Contexto (pt)](#contexto-pt)
  2. [Visual Results](#visual-results)
  3. [How to scrape a linkedin post - JavaScript](#how-to-scrape-a-linkedin-post)
  4. [Possible analysis to a polarizing linkedin post - Python](#analysis)



## Contexto (pt)
No dia 28 de junho de 2022, o fundador e ex-ceo da [prozis](https://pt.wikipedia.org/wiki/Prozis#Controv%C3%A9rsias) publicou o seguinte post no linkedin:

<p align="center">
  <img src="media/post.jpg" height="120px" alt="It seems that unborn babies got their rights back in USA! Nature is healing!👍🤌👍"/>
</p>


Após imensas reações que transbordaram para outras redes sociais e círculos sociais, até ser notícia em vários media portugueses. Peguei em dois desafios:
1. recolher os comentários e reações dados deste post (ver como [aqui](#how-to-scrape-a-linkedin-post))
2. estudar estes dados para ver como o discurso se polarizou (ver como [aqui](#analysis))

Acontece que o *post foi removido dia 28 à tarde*, e apesar de [estar arquivado](https://web.archive.org/web/*/https://www.linkedin.com/posts/miguelmilhao_it-seems-that-unborn-babies-got-their-rights-activity-6946820360793169920-4E4z), o LinkedIn só mostra uma pequena parte das respostas e comentários, até o utilizador os expandir manualmente. Coincidentemente, eu tinha feita uma recolha dos dados na noite anterior (27/06/2022), portanto ainda que não seja com a totalidade dos dados, analisei como 3106 pessoas reagiram ou comentaram, olhei para o género do seu nome numa tentativa de separação entre visão de género, e para a forma como reagiram ao post inicial para prever a sua visão como pró-vida (pro-life) e pró-escolha (pro-choice). A análise é algo limitada mas a polarização na discussão ficou notória. 

Fica também aqui arquivado o [vídeo-monólogo](media/video-monologo.webm"), caso seja removido como o post foi (original [aqui](https://www.youtube.com/watch?v=RC6iN8C6LeY)).

<details><summary>Ver links partilhados (26)</summary>

Lista de todos os links presentas e respostas e comentários:
```text
https://www.spdc.pt/images/RelatrioIVG2018_Imprensa.pdf.
https://www.pewresearch.org/religion/fact-sheet/public-opinion-on-abortion/
https://www.pewresearch.org/religion/fact-sheet/public-opinion-on-abortion/mulheres
https://www.pewresearch.org/religion/2022/05/06/americas-abortion-quandary/
https://instagram.com/martamelroblackbird?igshid=YmMyMTA2M2Y=
https://expresso.pt/opiniao/2022-06-27-Sou-catolico-o-fim-do-Roe-vs.-Wade-e-um-avanco-da-morte-nao-da-vida-41d86801
https://www.rtp.pt/play/p9874/linha-da-frente
https://www.bbc.com/news/uk-england-merseyside-60714093.amp
https://www.publico.pt/2021/06/22/mundo/noticia/violacoes-graves-criancas-conflitos-sao-assustadoramente-altas-alerta-onu-1967445
https://postimg.cc/LgktFy07
https://www.msdmanuals.com/
https://www.instagram.com/tv/CeuL7R8rjKM/?igshid=YmMyMTA2M2Y=
https://observador.pt/2022/06/24/menina-brasileira-autorizada-a-abortar-apos-polemica-crianca-ficou-gravida-devido-a-violacao/
https://www.who.int/news-room/fact-sheets/detail/abortion
https://www.guttmacher.org/perspectives50/abortion-and-after-legalization
https://www.generonumero.media/portugal-espanha-e-uruguai-o-que-aconteceu-apos-legalizacao-do-aborto/
https://observador.pt/2022/06/24/menina-brasileira-autorizada-a-abortar-apos-polemica-crianca-ficou-gravida-devido-a-violacao/
https://catholicinbelfast.blogspot.com/2018/05/i-was-going-to-be-aborted.htmlEM
https://vounessadirecao.blogspot.com/2020/08/eu-ia-ser-abortado.html
https://www.youtube.com/watch?v=XxYW-B-64Fo
https://observador.pt/2022/06/24/menina-brasileira-autorizada-a-abortar-apos-polemica-crianca-ficou-gravida-devido-a-violacao/
https://observador.pt/2022/06/24/menina-brasileira-autorizada-a-abortar-apos-polemica-crianca-ficou-gravida-devido-a-violacao/
https://www.youtube.com/watch?v=kffacxfA7G4
https://www.linkedin.com/posts/bloco-de-esquerda_em-portugal-a-persegui%C3%A7%C3%A3o-das-mulheres-terminou-activity-6947194675862618113-16nN/
https://www.noticiasaominuto.com/mundo/2017827/bebe-morre-apos-ser-negado-aborto-a-menina-de-12-anos-violada-pelo-avo
https://www.publico.pt/2021/06/22/mundo/noticia/violacoes-graves-criancas-conflitos-sao-assustadoramente-altas-alerta-onu-1967445
```

</details>


## Visual Results

<h3 align="center">wordcloud of all the replies and comments in the linkedin post</h3>
<p align="center">
  <img src="media/all.png" width="60%"/>
</p>

<h3 align="center">wordcloud of all the replies and comments by miguel milhão</h3>
<p align="center">
  <img src="media/mm.png" width="60%"/>
</p>

<h3 align="center">wordcloud of prolife accounts identified based on positive reactions to the original post</h3>
<p align="center">
  <img src="media/prolife.png" width="60%"/>
</p>

<h3 align="center">distribution of individual reactions across name gender and position</h3>
<p align="center">
  <img src="media/reactions_dist.png" width="60%"/>
</p>

<h3 align="center">Network visualization of user reactions to other users, colored for name gender</h3>
<p align="center">
  <img src="media/final-gender-label.png" width="100%"/>
  <img src="media/gender_position.png" width="70%"/>
</p>

Name gender prolife distribution
* 283/427 aka 66.28% of prolife are male, they are 1297/3106 aka 41.76% of all people
* 139/427 aka 32.55% of prolife are female, they are 1802/3106 aka 58.02% of all people
* 5/427 aka 1.17% of prolife are other, they are 7/3106 aka 0.23% of all people

Name gender prochoice distribution
* 1663/2679 aka 62.08% of prochoice are female, they are 1802/3106 aka 58.02% of all people
* 1014/2679 aka 37.85% of prochoice are male, they are 1297/3106 aka 41.76% of all people
* 2/2679 aka 0.07% of prochoice are other, they are 7/3106 aka 0.23% of all people

<h3 align="center">Network visualization of user reactions to other users, colored for predicted position on abortion</h3>
<p align="center">
  <img src="media/final-position-label.png" width="100%"/>
<img src="media/position_gender.png" width="70%"/>
</p>


---
EN below

## How to scrape a linkedin post
> Use your browser console to thoroughly scrape a linkedin post

##### Instructions 

1. read these until the end first
2. go to a linkedin post page
3. open the console
4. paste all of the contents of [code.js](code.js)
5. run `await loadAllData();` which will expand all the comments and responses -> might need to run it multiple times
6. run `await getAndDownloadAllData("output.json");` and sitback, it can take several minutes depending on the size of the post, it will put some pressure on your browser + computer, the output.json file will be downloaded when ready

You can also run  `await getAndDownloadAllData("output.json");` before `await loadAllData();` to make sure the download is working as expected for a sample of the data. 

This might happen, advice is to monitor RAM and close all non-essential applications and browser windows:


<p align="center">
  <img src="https://user-images.githubusercontent.com/19508417/176014620-b0f87411-298d-4845-a047-f76e8f304b06.png" style = "height:140px"/>
</p>

---


## Analysis
* Check this twitter thread: 
* The jupyter notebook with the analysis: [analysis.ipynb](analysis.ipynb)

Since the data contains a lot of personal information, and allows to predict the idealogical leaning of those involved, only the [generated graph data](mm-27.gexf) is shared, which is anonymised. 
