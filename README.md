## Synapsis Frontend Developer Test

Untuk menjalankan program ini, anda harus melakukan beberapa tahap berikut:
1. Melakukan git clone git@github.com:galihhhp/synapsis-test.git
2. Menginstall dependencies dengan melakukan yarn install
3. Kemudian menjalankan development server dengan melakukan yarn dev

Bug:
1. Delete by Id dan Update user masih belum berfungsi dengan baik, respon yang diberikan apabila dilakukan request sudah 200 atau success. Namun sampai sekarang belum bisa saya selesaikan kenapa tidak ada perubahan yang seharusnya. Terkadang, dapat dihapus, tapi lebih sering tidak dapat dihapus. Kemudian, beberapa data dapat diupdate valuenya namun beberapa tidak bisa. Dari bug ini saya merasa masalahnya adalah karena saya belum pernah hands on mongo db sehingga ini menjadi blocker.

Rencana yang tidak bisa terealisasikan:
1. Saya ingin membuat fitur auth dimana user bisa sign in, sign up, dan forgot password menggunakan firebase auth. Namun, karena blocker dan sudah tidak ada waktu untuk mengerjakannya, fitur ini tidak dapat terealisasikan.

