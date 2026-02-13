<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/img/small_cheese.png" type="image/x-icon">
    <title>Parmclick - Inscription</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="h-screen bg-[#ffb900] font-sans">
<div class="flex flex-col items-center justify-center min-h-screen w-full p-4">

    <div class="mb-6 text-center">
        <h1 class="text-5xl font-black text-white drop-shadow-lg tracking-tight">
            🧀 PARMCLICK
        </h1>
        <p class="text-white font-bold text-lg mt-2 uppercase tracking-widest opacity-90">Rejoignez la guilde</p>
    </div>

    <form action="http://localhost:8000/register" method="POST" class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div class="bg-[#fe9a00] p-5 text-white text-center">
            <h3 class="font-bold text-2xl uppercase tracking-wide">Nouveau Fromager</h3>
            <p class="text-orange-100 text-sm italic">Préparez votre cave d'affinage</p>
        </div>

        <div class="p-8 space-y-4">
            <div class="flex flex-col gap-1">
                <?php
                    if (isset($userNameError)) {
                        echo "<p class='text-red-100'>$userNameError</p>";
                    }
                ?>
                <label for="username" class="font-bold text-[#b45309] ml-1">Nom d'utilisateur</label>
                <input type="text" name="username" id="username"
                       placeholder="Ex: LeRoiDuCheddar"
                       class="w-full px-4 py-3 border-2 border-orange-100 rounded-xl focus:border-[#fe9a00] focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all bg-white" required>
            </div>

            <div class="flex flex-col gap-1">
                <label for="email" class="font-bold text-[#b45309] ml-1">Email</label>
                <input type="email" name="email" id="email"
                       placeholder="votre@email.fr"
                       class="w-full px-4 py-3 border-2 border-orange-100 rounded-xl focus:border-[#fe9a00] focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all bg-white" required>
            </div>

            <div class="flex flex-col gap-1">
                <label for="password" class="font-bold text-[#b45309] ml-1">Mot de passe</label>
                <input type="password" name="password" id="password"
                       placeholder="••••••••"
                       class="w-full px-4 py-3 border-2 border-orange-100 rounded-xl focus:border-[#fe9a00] focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all bg-white" required>
            </div>

            <div class="flex flex-col gap-1">
                <label for="passwordConfirm" class="font-bold text-[#b45309] ml-1">Confirmez le mot de passe</label>
                <input type="password" name="passwordConfirm" id="passwordConfirm"
                       placeholder="••••••••"
                       class="w-full px-4 py-3 border-2 border-orange-100 rounded-xl focus:border-[#fe9a00] focus:ring-4 focus:ring-orange-200 focus:outline-none transition-all bg-white" required>
            </div>

            <div class="pt-4">
                <button type="submit"
                        class="w-full bg-[#fe9a00] hover:bg-[#e68a00] text-white font-black py-4 rounded-xl shadow-[0_4px_0_rgb(180,83,9)] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest cursor-pointer">
                    Créer ma meule
                </button>
            </div>
        </div>

        <div class="bg-gray-50 p-4 text-center border-t border-gray-100">
            <p class="text-gray-500 text-sm">
                Déjà membre de la cave ?
                <a href="connexion.html" class="text-[#fe9a00] font-bold hover:underline">Connectez-vous</a>
            </p>
        </div>
    </form>
</div>
</body>
</html>