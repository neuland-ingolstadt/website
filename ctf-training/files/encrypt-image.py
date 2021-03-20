import os
import cv2
from Crypto.Cipher import AES

key = os.urandom(16)
cipher = AES.new(key, AES.MODE_ECB)

img = cv2.imread("flag.png", cv2.IMREAD_COLOR)
encrypted = cipher.encrypt(img.tobytes())

with open("message.bin", "wb+") as fd:
	fd.write(encrypted)
