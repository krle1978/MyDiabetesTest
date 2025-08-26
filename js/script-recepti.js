// JavaScript za prikazivanje recepta
function showRecipe(recipe) {
    let recipeText = document.getElementById("recipe-text");

    if (recipe === 'breakfast1') {
        recipeText.innerHTML = `
            <h2>Ovsena kaša sa bademima i borovnicama</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>50 g ovsenih pahuljica</li>
                <li>200 ml bademovog mleka (ili običnog mleka)</li>
                <li>1 kašika chia semena</li>
                <li>1 šaka svežih borovnica</li>
                <li>10-12 badema, grubo iseckanih</li>
                <li>Prstohvat cimeta</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>U šerpicu sipajte ovsene pahuljice i bademovo mleko. Kuvajte na laganoj vatri uz stalno mešanje dok smesa ne postane kremasta (oko 5 minuta).</li>
                <li>Sklonite sa šporeta, umešajte chia seme i prstohvat cimeta.</li>
                <li>Prelijte kašu borovnicama i pospite seckanim bademima. Po želji dodajte malo stevije za zaslađivanje.</li>
            </ol>
        `;
    }
    else if (recipe === 'breakfast2') {
        recipeText.innerHTML = `
            <h2>Jaja sa povrćem</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>2 jaja</li>
                <li>1/2 crvene paprike, isečene</li>
                <li>1/2 šolje iseckanog spanaća</li>
                <li>1/4 šolje iseckanih gljiva</li>
                <li>So, biber po ukusu</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>U tavi propržite povrće na malo maslinovog ulja dok ne omekša.</li>
                <li>Ubacite umućena jaja i propržite dok se jaja ne skuvaju po vašoj želji.</li>
                <li>Poslužite uz integralni hleb.</li>
            </ol>
        `;
    }
    else if (recipe === 'breakfast3') {
        recipeText.innerHTML = `
            <h2>Grčki jogurt sa chia semenkama i malinama</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>2 jaja</li>
                <li>1/2 crvene paprike, isečene</li>
                <li>1/2 šolje iseckanog spanaća</li>
                <li>1/4 šolje iseckanih gljiva</li>
                <li>So, biber po ukusu</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>U tavi propržite povrće na malo maslinovog ulja dok ne omekša.</li>
                <li>Ubacite umućena jaja i propržite dok se jaja ne skuvaju po vašoj želji.</li>
                <li>Poslužite uz integralni hleb.</li>
            </ol>
        `;
    }
    else if (recipe === 'snack1') {
        recipeText.innerHTML = `
            <h2>Šaka orašastih plodova</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>1 šaka mešanih orašastih plodova (bademi, lešnici, orasi)</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Uzeti šaku orašastih plodova i konzumirati kao užinu.</li>
                <li>Možete dodati malo morske soli ili cimet po želji.</li>
            </ol>
        `;
    }
    else if (recipe === 'snack2') {
        recipeText.innerHTML = `
            <h2>Sirova šargarepa ili celer sa humusom</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>1 šargarepa (ili celer), isečena na štapiće</li>
                <li>3 kašike humusa</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Iseći šargarepu ili celer na štapiće.</li>
                <li>Poslužiti uz humus za umakanje.</li>
            </ol>
            <p><strong>Napomena:</strong> Niskokaloričan i bogat vlaknima.</p>
        `;
    }
    else if (recipe === 'snack3') {
        recipeText.innerHTML = `
            <h2>Jedna jabuka sa kašikom kikiriki putera</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>1 jabuka, isečena na kriške</li>
                <li>1 kašika kikiriki putera</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Iseći jabuku na kriške.</li>
                <li>Svaku krišku premazati sa malo kikiriki putera.</li>
            </ol>
            <p><strong>Napomena:</strong> Kombinacija vlakana i zdravih masti.</p>
        `;
    }
    else if (recipe === 'lunch1') {
        recipeText.innerHTML = `
            <h2>Pečena piletina sa povrćem</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>150 g pilećeg filea</li>
                <li>1 tikvica, sečena na kolutove</li>
                <li>1 paprika, sečena na trakice</li>
                <li>1 šaka brokolija</li>
                <li>1 kašika maslinovog ulja</li>
                <li>So, biber, beli luk u prahu, origano po ukusu</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Zagrejte rernu na 200°C..</li>
                <li>Piletinu začinite solju, biberom i belim lukom u prahu. Povrće pomešajte sa maslinovim uljem, solju i origanom.</li>
                <li>Stavite piletinu i povrće na papir za pečenje. Pecite oko 20-25 minuta, dok piletina ne bude potpuno pečena, a povrće blago zapečeno.</li>
                <li>Poslužite toplo uz salatu od rukole ili spanaća.</li>
            </ol>
            <p><strong>Napomena Piletinu začinite solju, biberom i belim lukom u prahu. Povrće pomešajte sa maslinovim uljem, solju i origanom.
    `}
    else if (recipe === 'lunch2') {
        recipeText.innerHTML = `
            <h2>Riblji file sa kvinojom</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>150 g ribljeg filea (losos, oslić ili pastrmka)</li>
                <li>50 g kvinoje</li>
                <li>1/2 šolje brokolija</li>
                <li>1/2 šolje seckane tikvice</li>
                <li>Sok od pola limuna</li>
                <li>1 kašika maslinovog ulja</li>
                <li>So, biber i začinsko bilje (timijan, bosiljak) po ukusu</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Skuvajte kvinoju prema uputstvu sa pakovanja i ostavite je sa strane.</li>
                <li>Riblji file začinite solju, biberom i limunovim sokom. Pecite na maslinovom ulju u tiganju ili rerni dok ne dobije zlatnu boju (oko 4-5 minuta sa svake strane).</li>
                <li>Povrće kratko blanširajte (ili dinstajte na pari).</li>
                <li>Poslužite ribu preko kvinoje i dodajte povrće sa strane.</li>
            </ol>
            
    `}
    else if (recipe === 'lunch3') {
        recipeText.innerHTML = `
            <h2>Sočivo ili pasulj čorba</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>200 g kuvanog belog ili crvenog pasulja</li>
                <li>1 manji crni luk, sitno iseckan</li>
                <li>1 šargarepa, seckana na kolutove</li>
                <li>1 paradajz, iseckan ili kašika paradajz pirea</li>
                <li>1 kašika maslinovog ulja</li>
                <li>500 ml vode ili povrćnog bujona</li>
                <li>So, biber, beli luk u prahu, origano po ukusu</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>U šerpi zagrejte maslinovo ulje i propržite luk dok ne postane staklast. Dodajte šargarepu i dinstajte nekoliko minuta.</li>
                <li>Ubacite paradajz i začine, pa sve prelijte bujonom ili vodom. Kuvajte na srednjoj vatri 10 minuta.</li>
                <li>Dodajte kuvani pasulj i kuvajte još 5-10 minuta. Po potrebi dodajte još začina.</li>
                <li>Poslužite toplu čorbu uz krišku integralnog hleba.</li>
            </ol>
            
            `}
    else if (recipe === 'snack2pm') {
        recipeText.innerHTML = `
            <h2>Avokado sa kriškom integralnog hleba</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>1/2 zrelog avokada</li>
                <li>1 kriška integralnog hleba</li>
                <li>Prstohvat soli i bibera</li>
                <li>Sok od limuna</li>
                <li>Sveži začini (peršun, korijander ili bosiljak - opcionalno)</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Izgnječite avokado viljuškom i dodajte prstohvat soli, bibera i nekoliko kapi limunovog soka.</li>
                <li>Namaz od avokada ravnomerno rasporedite po integralnom hlebu.</li>
                <li>Po želji pospite svežim začinskim biljem i odmah poslužite.</li>
            </ol>
            
    `}
    else if (recipe === 'snack3pm') {
        recipeText.innerHTML = `
            <h2>Parče sira sa nekoliko oraha</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>Parče sira</li>
                <li>Orasi</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Sameljite orahe</li>
                <li>Ispasirajte sira sa mlevenim orasima.</li>
                <li>Poslužite u zdeli.</li>
            </ol>
    `}
    else if (recipe === 'snack4pm') {
        recipeText.innerHTML = `
            <h2>Smoothie od spanaća, krastavca, limuna i đumbira</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>1 šaka svežeg spanaća</li>
                <li>1/2 krastavca</li>
                <li>1 limun (samo sok)</li>
                <li>1/2 šolje vode ili kokosove vode</li>
                <li>Mali komadić đumbira</li>
                <li>Malo stevije po ukusu</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Sve sastojke stavite u blender i blendajte dok ne dobijete glatku smesu.</li>
                <li>Poslužite hladno, sa nekoliko kockica leda ako želite osvežavajući efekat.</li>
            </ol>
        `}
    else if (recipe === 'dinner1') {
        recipeText.innerHTML = `
            <h2>Pečeni batat sa piletinom i salatom od rukole</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>1 veliki batat</li>
                <li>200g pilećeg fileta</li>
                <li>1 kašika maslinovog ulja</li>
                <li>So i biber po ukusu</li>
                <li>50g rukole</li>
                <li>Sok od pola limuna</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Zagrejte rernu na 200°C. Operite batat, isecite ga na kriške i začinite maslinovim uljem, solju i biberom. Pecite na plehu obloženom papirom za pečenje 25-30 minuta</li>
                <li>Pileći file začinite po ukusu i ispecite na gril tiganju ili roštilju dok ne postane zlatno smeđ.</li>
                <li>U činiji pomešajte rukolu i sok od limuna.</li>
                <li>Servirajte batat, piletinu i salatu zajedno.</li>
            </ol>
            <p><strong>Napomena:</strong> Batat ima niži glikemijski indeks od krompira.</p>
        `}
        else if (recipe === 'dinner2') {
            recipeText.innerHTML = `
                <h2>Grilovani tofu sa povrćem na žaru</h2>
                <p><strong>Sastojci:</strong></p>
                <ul>
                    <li>200g tofua</li>
                    <li>1 tikvica</li>
                    <li>1 crvena paprika</li>
                    <li>1 šaka šampinjona</li>
                    <li>1 kašika soja sosa</li>
                    <li>1 kašika maslinovog ulja</li>
                    <li>Prstohvat soli i bibera</li>
                </ul>
                <p><strong>Priprema:</strong></p>
                <ol>
                    <li>Prethodno iscedite tofu i iseckajte na komade veličine zalogaja.</li>
                    <li>U posudi pomešajte soja sos, maslinovo ulje, so i biber. U ovoj mešavini marinirajte tofu 10-15 minuta.</li>
                    <li>Povrće (tikvicu, crvenu papriku i šampinjone) iseckajte i prelijte sa malo maslinovog ulja i soli.</li>
                    <li>Grilujte tofu i povrće na srednje jakoj vatri dok ne postanu zlatno smeđi i mekani.</li>
                    <li>Poslužite tofu sa povrćem i uživajte!</li>
                </ol>
            `;
        }
    
    else if (recipe === 'dinner3') {
        recipeText.innerHTML = `
            <h2>Pohovani patlidžan u rerni sa paradajz sosom i parmezanom</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>200g tofua</li>
                <li>1 tikvica</li>
                <li>1 crvena paprika</li>
                <li>1 šaka šampinjona</li>
                <li>1 kašika soja sosa</li>
                <li>1 kašika maslinovog ulja</li>
                <li>Prstohvat susama</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Tofu isecite na kriške i marinirajte u soja sosu 10-15 minuta.</li>
                <li>Tikvicu, papriku i šampinjone isecite na komade i premažite maslinovim uljem.</li>
                <li>Na gril tiganju ili roštilju ispecite tofu i povrće dok ne dobiju blago zlatnu boju.</li>
                <li>Pospite susamom i servirajte toplo.</li>
            </ol>
            <p><strong>Napomena:</strong> Zdravija verzija italijanskog jela.</p>
        `}
    else if (recipe === 'dessert1') {
        recipeText.innerHTML = `
            <h2>Čokoladni mousse od avokada</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>1 zreo avokado</li>
                <li>50g crne čokolade (70% kakaa ili više)</li>
                <li>1 kašika kakao praha</li>
                <li>1 kašika meda ili stevije</li>
                <li>1 kašičica ekstrakta vanile</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Otopite crnu čokoladu na pari ili u mikrotalasnoj.</li>
                <li>U blenderu pomešajte avokado, otopljenu čokoladu, kakao prah, zaslađivač i vanilu dok ne dobijete glatku smesu.</li>
                <li>Sipajte u čaše i ostavite u frižideru 1-2 sata pre serviranja.</li>
            </ol>
            <p><strong>Napomena:</strong> Koristiti crnu čokoladu sa visokim procentom kakaa.</p>
        `}
    else if (recipe === 'dessert2') {
        recipeText.innerHTML = `
            <h2>Sveže bobičasto voće sa cimetom</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>Šaka borovnica</li>
                <li>Šaka malina</li>
                <li>Šaka jagoda (iseckanih)</li>
                <li>Prstohvat cimeta</li>
                <li>Po želji, malo grčkog jogurta</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Operite i osušite voće.</li>
                <li>Pospite cimetom i, po želji, servirajte uz grčki jogurt.</li>
            </ol>
            <p><strong>Napomena:</strong> Niskokalorično i bogato antioksidansima.</p>
        `}
    else if (recipe === 'dessert3') {
        recipeText.innerHTML = `
            <h2>Chia puding sa kokosovim mlekom</h2>
            <p><strong>Sastojci:</strong></p>
            <ul>
                <li>3 kašike chia semenki</li>
                <li>200ml kokosovog mleka</li>
                <li>1 kašika stevije ili meda</li>
                <li>Po želji, sveže voće za dekoraciju</li>
            </ul>
            <p><strong>Priprema:</strong></p>
            <ol>
                <li>Pomešajte chia semenke, kokosovo mleko i zaslađivač u činiji.</li>
                <li>Ostavite u frižideru najmanje 4 sata (ili preko noći) dok smesa ne postane pudingasta.</li>
                <li>Dekorišite voćem po želji pre serviranja.</li>
            </ol>
            <p><strong>Napomena:</strong> Pripremljen sa stevijom ili drugim prirodnim zaslađivačem.</p>
        `}        
}

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open'); // Dodaje/uklanja klasu "open"
}

document.getElementById("recipe-combo").addEventListener("change", function () {
    const selectedRecipe = this.value; // Izabrani recept
    showRecipe(selectedRecipe); // Pokreni funkciju za prikaz recepta
});
