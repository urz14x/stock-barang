<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            clifford: '#da373d',
          }
        }
      }
    }
  </script>
  <style type="text/tailwindcss">
    @layer utilities {
      .content-auto {
        content-visibility: auto;
      }
    }
  </style>
   <style>
    tr:nth-child(even) {
      background-color: #ccc;
    }
  </style>
</head>
<body>
    <h1 class="text-3xl font-bold underline">
        Export Laporan Stock Barang Masuk Miftah Mesin
      </h1>
      <p>Pada Bulan {{ \Carbon\Carbon::parse($start_date)->format('Y-m-d') }} s.d {{ \Carbon\Carbon::parse($end_date)->format('Y-m-d') }} </p>
    <div class="relative overflow-x-auto">
        <table border="1px" style="width: 100%; border-collapse: collapse; font-family: sans-serif">
            <thead style="background-color: #FC6006">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Nama barang
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Jumlah
                    </th>
                </tr>
            </thead>
            <tbody>

                @foreach ($stockins as $stock)
                    <tr style="">
                        <td scope="row" style="width:5%; padding: 5px;" >
                            {{ $stock->id }}
                        </td>
                        <td scope="row" style="width:100%; padding: 5px;;">
                            {{ $stock->stock->name }}
                        </td>
                        <td scope="row" style="width:10%; padding: 5px;">
                            {{ $stock->quantity }}
                        </td>

                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>
</html>
