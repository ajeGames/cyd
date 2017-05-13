package com.ajegames.util;

import java.util.Random;

public class RandomString {

    private static final char[] keySymbols;
    private static final char[] symbols;

    static {
        StringBuilder tmp = new StringBuilder();
        for (char ch = '0'; ch <= '9'; ++ch)
            tmp.append(ch);
        for (char ch = 'a'; ch <= 'z'; ++ch)
            tmp.append(ch);
        keySymbols = tmp.toString().toCharArray();
        tmp.append(' ');
        symbols = tmp.toString().toCharArray();
    }

    private final Random random = new Random();

    private final char[] buf;

    public RandomString(int length) {
        if (length < 1)
            throw new IllegalArgumentException("length < 1: " + length);
        buf = new char[length];
    }

    public String nextKey() {
        for (int idx = 0; idx < buf.length; ++idx)
            buf[idx] = keySymbols[random.nextInt(keySymbols.length)];
        return new String(buf);
    }
}