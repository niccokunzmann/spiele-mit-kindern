Ein KeyPressMorph:
------------------
Methoden:
- tastendruck

In der Methode `tastendruck` wird geprüft, ob die vordefinierte Taste gedrückt wird. Wird sie gedrückt, 
wird eine Methode zum Bewegen eines Schiebers ausgeführt. Welcher Schieber bewegt wird und nach oben oder 
nach unten, hängt vom KeyPressMorph ab. Für jeden Spieler werden deshalb 2 solcher Morphs benötigt. Einer 
um nach oben seuern zu können und einer für nach unten.
