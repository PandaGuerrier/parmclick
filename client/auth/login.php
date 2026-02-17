<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/img/small_cheese.png" type="image/x-icon">
    <title>Parmclick - Connexion</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body class="h-screen bg-[#ffb900] font-sans">
<div class="flex flex-col items-center justify-center h-full w-full p-4">

    <div class="mb-8 text-center">
        <h1 class="text-5xl font-black text-white drop-shadow-lg tracking-tight">
            🧀 PARMCLICK
        </h1>
    </div>

    <form action="http://localhost:8000/auth/login" method="POST"
          class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div class="bg-[#fe9a00] p-6 text-white text-center">
            <h3 class="font-bold text-2xl uppercase tracking-wide">La Fromagerie</h3>
            <p class="text-orange-100 text-sm">Connectez-vous pour affiner votre empire</p>
        </div>

        <div class="p-8 space-y-6">
            <div class="flex flex-col gap-2">
                <label for="email" class="font-bold text-[#b45309] ml-1">Email du Fromager</label>
                <input type="email" name="email" id="email"
                       placeholder="maitre@fromager.fr"
                       class="w-full px-4 py-3 border-2 border-orange-100 rounded-xl focus:border-[#fe9a00] focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all bg-white">
            </div>

            <div class="flex flex-col gap-2">
                <label for="password" class="font-bold text-[#b45309] ml-1">Mot de passe</label>
                <input type="password" name="password" id="password"
                       placeholder="••••••••"
                       class="w-full px-4 py-3 border-2 border-orange-100 rounded-xl focus:border-[#fe9a00] focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all bg-white">
            </div>

            <div class="pt-4">
                <button type="submit"
                        class="w-full bg-[#fe9a00] hover:bg-[#e68a00] text-white font-black py-4 rounded-xl shadow-[0_4px_0_rgb(180,83,9)] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest cursor-pointer">
                    Démarrer la production
                </button>
            </div>
        </div>

        <div class="bg-gray-50 p-4 text-center border-t border-gray-100">
            <p class="text-gray-500 text-sm">
                Pas encore de compte ?
                <a href="register.php" class="text-[#fe9a00] font-bold hover:underline">Inscrivez-vous ici</a>
            </p>
        </div>
    </form>
</div>
</body>
</html>