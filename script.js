const countries=countries_data
const infoP=document.querySelector('.feedP')

const informationDiv=document.querySelector('.information')

const btnLang=document.querySelector('.lsbtn')

const btnPop=document.querySelector('.ppbtn')

const totalPopulation=TotalPopCalculator()
const SortedByPopulation=top10MostPopulatedCountries()

const [numberOfLanglages,sortedLanglages]=langSorted()
console.log(numberOfLanglages)
console.log(sortedLanglages)


let curentView='world'

giveWorld()

btnLang.addEventListener('click',giveLangWorld)
btnPop.addEventListener('click',giveWorld)


function TotalPopCalculator(){
    let PopulationLet=0
    for(const contry of countries){
        PopulationLet+=contry.population
    }
    return PopulationLet
}

function top10MostPopulatedCountries(){
    const SortedByPopulation=countries.sort((a,b)=>{
        if(a.population>b.population){
            return -1
        }
        if(a.population<b.population){
            return 1
        }
        return 0
    })

    const Sorted10=[]
    for(let i = 0;i < 10;i++){
        Sorted10.push(SortedByPopulation[i])
    }
    return Sorted10
}

function langSorted(){
    const langlages={}

    for(const country of countries){
        for(const langlage of country.languages){
            if(langlages.hasOwnProperty(langlage)){
                langlages[langlage]++
            }else{
                langlages[langlage]=1
            }

        }
    }
    const sortedLangs=Object.entries(langlages).sort((a,b)=>{
        if(a[1]>b[1]){
            return -1
        }
        if(a[1]<b[1]){
            return 1
        }
        return 0
    })

    return [sortedLangs.length,sortedLangs.slice(0,10)]
}

function giveWorld(){
    infoP.textContent='10 most populated countries in the world'
    informationDiv.innerHTML=''

    const temlate=document.querySelector('.temlate').content
    const worldCurrent=document.importNode(temlate,true)
    worldCurrent.querySelector('.specInfo').textContent='World'
    worldCurrent.querySelector('.colorOfBar').style.width='100%'
    worldCurrent.querySelector('.number').textContent=totalPopulation.toLocaleString("en-US")
    informationDiv.appendChild(worldCurrent)

    for(let i = 0;i<10;i++){
        const temlateForRow=document.querySelector('.temlate').content
        const Row=document.importNode(temlateForRow,true)
        Row.querySelector('.specInfo').textContent=SortedByPopulation[i].name
        const percent=(SortedByPopulation[i].population/totalPopulation)*100
        console.log(percent,totalPopulation)
        Row.querySelector('.colorOfBar').style.width=`${percent}%`
        Row.querySelector('.number').textContent=SortedByPopulation[i].population.toLocaleString("en-US")
        informationDiv.appendChild(Row)
    }
}

function giveLangWorld(){
    infoP.textContent='10 most Spoken languages in the world'
    informationDiv.innerHTML=''

    for(let i = 0;i<10;i++){
        const temlateForRow=document.querySelector('.temlate').content
        const Row=document.importNode(temlateForRow,true)
        Row.querySelector('.specInfo').textContent=sortedLanglages[i][0]
        const percent=(sortedLanglages[i][1]/numberOfLanglages)*100
        
        Row.querySelector('.colorOfBar').style.width=`${percent}%`
        Row.querySelector('.number').textContent=sortedLanglages[i][1]
        informationDiv.appendChild(Row)
    }

}