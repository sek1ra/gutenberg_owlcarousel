<?php
/**
 * Plugin Name: Gutenberd Owl Carousel Plugin
 * Description: This plugin adds an Owl Carousel
 * Version: 1.0.0
 * Author: sek1ra
 */

function gutenberg_plugin_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'g-owl-block',
        plugins_url('js/block.js', __FILE__ ),
        array('wp-blocks', 'wp-components', 'wp-editor'),
        filemtime(plugin_dir_path(__FILE__) . 'js/block.js')
    );
}
add_action('enqueue_block_editor_assets', 'gutenberg_plugin_enqueue_block_editor_assets');

function my_custom_block_plugin_enqueue_block_assets() {
    wp_enqueue_style(
        'my-custom-block-style',
        plugins_url('css/style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'css/style.css')
    );
}
add_action('enqueue_block_assets', 'my_custom_block_plugin_enqueue_block_assets');

function enqueue_custom_script_on_block_frontend() {
    if (is_singular() && has_block('owl-carousel-plugin/owl-carousel')) {
        wp_enqueue_script('owl-carousel-script', plugin_dir_url(__FILE__) . 'js/owl.carousel.min.js', array('jquery'), '1.0', true);
        wp_enqueue_script('owl-carousel-script-front', plugin_dir_url(__FILE__) . 'js/script.js', array('owl-carousel-script'), '1.0', true);
        wp_enqueue_style( 'owl-carousel-style', plugins_url('css/owl.carousel.css', __FILE__), array(), filemtime(plugin_dir_path(__FILE__) . 'css/owl.carousel.css') );
    }
}
add_action('enqueue_block_assets', 'enqueue_custom_script_on_block_frontend');