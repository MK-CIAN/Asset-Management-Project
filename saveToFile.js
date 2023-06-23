const blob = new Blob([csv], {tyoe: 'text/csv'});
const anchor = document.createElement('a');

anchor.download = 'TSLA_stock.csv';
anchor.href = URL.createObjectURL(blob);

anchor.click();
URL.revokeObjectURL(anchor.href);

localStorage.setItem('stockData', csv);

const savedCSV = lcoalStorage.getItem('stockData');

if(savedCSV){
    
} else {

}