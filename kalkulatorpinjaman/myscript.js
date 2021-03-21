document.getElementById('form-pinjaman').addEventListener('submit', kaklulatorPinjaman);




function kaklulatorPinjaman(e){

	const amount			= document.getElementById('amount');
	const interest			= document.getElementById('interest');
	const years				= document.getElementById('years');
	const pembayaran		= document.getElementById('pembayaran');
	const totalPayment		= document.getElementById('total_payment');
	const totalInterest		= document.getElementById('total_interest');

	const pinjaman          = parseFloat(amount.value);
	const hitungBunga		= parseFloat(interest.value)  / 100 / 12;
	const hitungJumlah		= parseFloat(years.value) * 12;


	const x					= Math.pow(1 + hitungBunga, hitungJumlah);

	const bayarBulanan		= (pinjaman*x*hitungBunga)/(x-1);

	if(isFinite(bayarBulanan)){
		pembayaran.value	=  bayarBulanan.toFixed(2);
		totalPayment.value  = (bayarBulanan * hitungJumlah).toFixed(2);
		totalInterest.value = ((bayarBulanan * hitungJumlah)-pinjaman).toFixed(2);
	} else {
		showError('mohon isi data dengan benar');
	}
	e.preventDefault();

}